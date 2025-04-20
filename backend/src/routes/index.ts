import { FastifyInstance} from "fastify";
import pizzaRoutes from "./pizza.routes";
import customerRoutes from "./customer.routes";
import addressRoutes from "./address.routes";

export async function registerRoutes(fastify: FastifyInstance) {
    fastify.register(pizzaRoutes, { prefix: "/api/pizza" });
    fastify.register(customerRoutes, { prefix: "/api/customer" });
    fastify.register(addressRoutes, { prefix: "/api/customer" });
}