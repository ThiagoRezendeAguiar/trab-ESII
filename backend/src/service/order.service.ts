import { inject, injectable } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { CreateOrderInput, OrderStatus, PizzaSize,AddOrderItemInput } from "../model/order.model";
import { NotFoundError, ValidationError } from "../utils/errors";
import { CustomerService } from "./customer.service";
import { PizzaService } from "./pizza.service";

@injectable()
export class OrderService {
constructor(
  @inject("PrismaClient") private prisma: PrismaClient,
  @inject("CustomerService") private customerService: CustomerService,
  @inject("PizzaService") private pizzaService: PizzaService
) {}

async create(data: CreateOrderInput) {
  await this.customerService.findById(data.customerId);
  const address = await this.prisma.address.findUnique({
    where: { id: data.addressId }
  });

  if (!address) {
    throw new NotFoundError("Address");
  }

  if (address.customerId !== data.customerId) {
    throw new ValidationError("Address does not belong to this customer");
  }
  if (!data.items || data.items.length === 0) {
    throw new ValidationError("Order must have at least one item");
  }
  let orderTotal = 0;
  const orderItems = await Promise.all(
    data.items.map(async (item) => {
      const pizza = await this.pizzaService.findById(item.pizzaId);
      
      if (!pizza.isAvailable) {
        throw new ValidationError(`Pizza ${pizza.name} is not available`);
      }
      let priceMultiplier = 1;
      switch (item.size) {
        case PizzaSize.SMALL:
          priceMultiplier = 0.8;
          break;
        case PizzaSize.MEDIUM:
          priceMultiplier = 1;
          break;
        case PizzaSize.LARGE:
          priceMultiplier = 1.2;
          break;
      }

      const itemPrice = Number(pizza.price) * priceMultiplier;
      const totalItemPrice = itemPrice * item.quantity;
      
      orderTotal += totalItemPrice;

      return {
        pizzaId: item.pizzaId,
        size: item.size,
        quantity: item.quantity,
        price: itemPrice,
        notes: item.notes
      };
    })
  );
  orderTotal += Number(data.deliveryFee);
  const order = await this.prisma.order.create({
    data: {
      customerId: data.customerId,
      addressId: data.addressId,
      status: OrderStatus.PENDING,
      total: orderTotal,
      deliveryFee: data.deliveryFee,
      items: {
        create: orderItems
      }
    },
    include: {
      items: true,
      customer: true,
      address: true
    }
  });

  return order;
}

async findAll() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
        address: true,
        items: {
          include: {
            Pizza: true
          }
        }
      }
    });
  }
  
  async findById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        address: true,
        items: {
          include: {
            Pizza: true
          }
        },
        payment: true
      }
    });
  
    if (!order) {
      throw new NotFoundError("Order");
    }
  
    return order;
  }

  async updateStatus(id: string, status: OrderStatus) {
    const order = await this.findById(id);
    this.validateStatusTransition(order.status, status);
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: { 
        status,
        ...(status === OrderStatus.DELIVERED ? { deliveryTime: new Date() } : {})
      },
      include: {
        customer: true,
        address: true,
        items: {
          include: {
            Pizza: true
          }
        }
      }
    });
    
    return updatedOrder;
  }

  private validateStatusTransition(currentStatus: OrderStatus, newStatus: OrderStatus) {
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
      [OrderStatus.PREPARING]: [OrderStatus.READY, OrderStatus.CANCELLED],
      [OrderStatus.READY]: [OrderStatus.OUT_FOR_DELIVERY, OrderStatus.CANCELLED],
      [OrderStatus.OUT_FOR_DELIVERY]: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
      [OrderStatus.DELIVERED]: [], 
      [OrderStatus.CANCELLED]: [] 
    };

    if (!validTransitions[currentStatus].includes(newStatus) && currentStatus !== newStatus) {
      throw new ValidationError(`Cannot transition from ${currentStatus} to ${newStatus}`);
    }
  }

  async cancelOrder(id: string) {
    const order = await this.findById(id);
    if (order.status === OrderStatus.CANCELLED) {
      throw new ValidationError("Order is already cancelled");
    }
    
    if (order.status === OrderStatus.DELIVERED) {
      throw new ValidationError("Cannot cancel a delivered order");
    }
    const cancelledOrder = await this.prisma.order.update({
      where: { id },
      data: { 
        status: OrderStatus.CANCELLED
      },
      include: {
        customer: true,
        address: true,
        items: {
          include: {
            Pizza: true
          }
        }
      }
    });
    
    return cancelledOrder;
  }

  async findOrderItems(orderId: string) {
    await this.findById(orderId);
    const orderItems = await this.prisma.orderItem.findMany({
      where: { orderId },
      include: {
        Pizza: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            ingredients: true,
            isAvailable: true,
            category: true
          }
        }
      },
      orderBy: {
        id: 'asc'
      }
    });
    
    return orderItems;
  }

  async addOrderItem(orderId: string, itemData: AddOrderItemInput) {
    const order = await this.findById(orderId);
    
    const pizza = await this.pizzaService.findById(itemData.pizzaId);
    
    if (!pizza.isAvailable) {
      throw new ValidationError(`Pizza ${pizza.name} is not available`);
    }
    
    let priceMultiplier = 1;
    switch (itemData.size) {
      case 'SMALL':
        priceMultiplier = 0.8;
        break;
      case 'MEDIUM':
        priceMultiplier = 1;
        break;
      case 'LARGE':
        priceMultiplier = 1.2;
        break;
    }
    
    const itemPrice = Number(pizza.price) * priceMultiplier;
    const totalItemPrice = itemPrice * itemData.quantity;
    
    const newItem = await this.prisma.orderItem.create({
      data: {
        orderId,
        pizzaId: itemData.pizzaId,
        size: itemData.size,
        quantity: itemData.quantity,
        price: itemPrice,
        notes: itemData.notes
      },
      include: {
        Pizza: true
      }
    });
    
    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        total: {
          increment: totalItemPrice
        }
      }
    });
    
    return newItem;
  }

  async removeOrderItem(orderId: string, itemId: string) {

    const order = await this.findById(orderId);
    
    if (order.status !== OrderStatus.PENDING && order.status !== OrderStatus.CONFIRMED) {
        throw new ValidationError(`Cannot remove items from an order with status ${order.status}`);
      }
 
    const item = await this.prisma.orderItem.findUnique({
      where: { id: itemId }
    });
    
    if (!item) {
      throw new NotFoundError("Order item");
    }
    
    if (item.orderId !== orderId) {
      throw new ValidationError("Item does not belong to this order");
    }
    
    const itemTotal = Number(item.price) * item.quantity;
  
    await this.prisma.orderItem.delete({
      where: { id: itemId }
    });

    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        total: {
          decrement: itemTotal
        }
      },
      include: {
        items: {
          include: {
            Pizza: true
          }
        },
        customer: true,
        address: true
      }
    });

    if (updatedOrder.items.length === 0) {
      return this.prisma.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.CANCELLED
        },
        include: {
          items: true,
          customer: true,
          address: true
        }
      });
    }
    
    return updatedOrder;
  }
}
