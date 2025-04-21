import { FastifyReply, FastifyRequest } from "fastify";
import { inject, injectable } from "tsyringe";
import { OrderService } from "../service/order.service";
import { CreateOrderInput , OrderStatus,AddOrderItemInput} from "../model/order.model";

@injectable()
export class OrderController {
constructor(@inject("OrderService") private orderService: OrderService) {}

async createOrder(request: FastifyRequest<{ Body: CreateOrderInput }>, reply: FastifyReply) {
  const order = await this.orderService.create(request.body);
  reply.status(201).send(order);
}

async getOrders(request: FastifyRequest, reply: FastifyReply) {
    const orders = await this.orderService.findAll();
    reply.send(orders);
  }

  async getOrderById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params;
    const order = await this.orderService.findById(id);
    reply.send(order);
  }

  async updateOrderStatus(
    request: FastifyRequest<{ 
      Params: { id: string },
      Body: { status: OrderStatus }
    }>, 
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const { status } = request.body;
    
    const updatedOrder = await this.orderService.updateStatus(id, status);
    reply.send(updatedOrder);
  }

  async cancelOrder(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params;
    const cancelledOrder = await this.orderService.cancelOrder(id);
    reply.send(cancelledOrder);
  }

  async getOrderItems(request: FastifyRequest<{ Params: { orderId: string } }>, reply: FastifyReply) {
    const { orderId } = request.params;
    const orderItems = await this.orderService.findOrderItems(orderId);
    reply.send(orderItems);
  }

  async addOrderItem(
    request: FastifyRequest<{ 
      Params: { orderId: string },
      Body: AddOrderItemInput
    }>, 
    reply: FastifyReply
  ) {
    const { orderId } = request.params;
    const newItem = await this.orderService.addOrderItem(orderId, request.body);
    reply.status(201).send(newItem);
  }

  async removeOrderItem(
    request: FastifyRequest<{ 
      Params: { orderId: string, id: string }
    }>, 
    reply: FastifyReply
  ) {
    const { orderId, id } = request.params;
    const updatedOrder = await this.orderService.removeOrderItem(orderId, id);
    reply.send(updatedOrder);
  }
}