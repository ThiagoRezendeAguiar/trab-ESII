import { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { OrderController } from "../controller/order.controller";
import { createOrderSchema,updateOrderStatusSchema,getOrderItemsSchema,addOrderItemSchema,removeOrderItemSchema } from "../schema/order.schema";

export default async function orderRoutes(fastify: FastifyInstance) {
const orderController = container.resolve(OrderController);

fastify.post("/", { schema: createOrderSchema }, orderController.createOrder.bind(orderController));
fastify.get("/", orderController.getOrders.bind(orderController));
fastify.get("/:id", orderController.getOrderById.bind(orderController));
fastify.put("/:id/status", { schema: updateOrderStatusSchema }, orderController.updateOrderStatus.bind(orderController));
fastify.delete("/:id", orderController.cancelOrder.bind(orderController));
fastify.get("/:orderId/items", { schema: getOrderItemsSchema }, orderController.getOrderItems.bind(orderController));
fastify.post("/:orderId/items", { schema: addOrderItemSchema }, orderController.addOrderItem.bind(orderController));
fastify.delete("/:orderId/items/:id", { schema: removeOrderItemSchema }, orderController.removeOrderItem.bind(orderController));
}