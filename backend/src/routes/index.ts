import { FastifyInstance} from "fastify";
import pizzaRoutes from "./pizza.routes";
import customerRoutes from "./customer.routes";
import addressRoutes from "./address.routes";
import orderRoutes from "./order.routes";
import paymentRoutes from './payment.routes';

export async function registerRoutes(fastify: FastifyInstance) {
    fastify.register(pizzaRoutes, { prefix: "/api/pizza" });
    fastify.register(customerRoutes, { prefix: "/api/customer" });
    fastify.register(addressRoutes, { prefix: "/api/customer" });
    fastify.register(orderRoutes, { prefix: "/api/order" });
    fastify.register(paymentRoutes, { prefix: "/api/payment" });
}