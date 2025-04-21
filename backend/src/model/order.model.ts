// model/order.model.ts
import { OrderStatus, PizzaSize } from '@prisma/client';

export { OrderStatus, PizzaSize };

export interface OrderItem {
id: string;
orderId: string;
pizzaId: string;
size: PizzaSize;
quantity: number;
price: number;
notes?: string;
}

export interface Order {
id: string;
customerId: string;
addressId: string;
status: OrderStatus;
items: OrderItem[];
total: number;
deliveryFee: number;
deliveryTime?: Date;
createdAt: Date;
updatedAt: Date;
}

export interface CreateOrderItemInput {
pizzaId: string;
size: PizzaSize;
quantity: number;
notes?: string;
}

export interface CreateOrderInput {
customerId: string;
addressId: string;
items: CreateOrderItemInput[];
deliveryFee: number;
}

export type UpdateOrderStatusInput = {
status: OrderStatus;
};

export interface AddOrderItemInput {
    pizzaId: string;
    size: PizzaSize;
    quantity: number;
    notes?: string;
    }