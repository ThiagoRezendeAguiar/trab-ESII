import { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { PizzaController } from "../controller/pizza.controller";
import { createPizzaSchema,updatePizzaSchema,updateAvailabilitySchema } from "../schema/pizza.schema";

export default async function pizzaRoutes(fastify: FastifyInstance) {
    const pizzaController = container.resolve(PizzaController);

    fastify.post("/", { schema: createPizzaSchema }, pizzaController.createPizza.bind(pizzaController));
    fastify.get("/", pizzaController.getPizzas.bind(pizzaController));
    fastify.get("/:id", pizzaController.getPizzaById.bind(pizzaController));
    fastify.put("/:id", { schema: updatePizzaSchema }, pizzaController.updatePizza.bind(pizzaController));
    fastify.patch("/:id/availability", { schema: updateAvailabilitySchema }, pizzaController.updateAvailability.bind(pizzaController));
    fastify.delete("/:id", pizzaController.deletePizza.bind(pizzaController));

}