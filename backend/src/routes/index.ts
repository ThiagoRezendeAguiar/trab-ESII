import { FastifyInstance} from "fastify";
import pizzaRoutes from "./pizza.routes";

export async function registerRoutes(fastify: FastifyInstance) {
    fastify.register(pizzaRoutes, { prefix: "/api/pizza" });
}