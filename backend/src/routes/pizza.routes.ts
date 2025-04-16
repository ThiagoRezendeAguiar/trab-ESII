import { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { PizzaController } from "../controller/pizza.controller";
import { createPizzaSchema } from "../schema/pizza.schema";

export default async function pizzaRoutes(fastify: FastifyInstance) {
    const pizzaController = container.resolve(PizzaController);

    fastify.post("/", { schema: createPizzaSchema }, pizzaController.createPizza.bind(pizzaController));

}