import { FastifyReply, FastifyRequest } from "fastify";
import { PizzaService } from "../service/pizza.service";
import { CreatePizzaInput } from "../model/pizza.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class PizzaController {
    constructor(@inject('PizzaService') private pizzaService: PizzaService) {}

    async createPizza(request: FastifyRequest<{Body: CreatePizzaInput}>, reply: FastifyReply) {
        const newPizza = await this.pizzaService.create(request.body);
        reply.status(201).send(newPizza);
    }

    async getPizzas(request: FastifyRequest, reply: FastifyReply) {
        const pizzas = await this.pizzaService.findAll();
        reply.send(pizzas);
    }

    async getPizzaById(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
        try {
            const { id } = request.params;
            const pizza = await this.pizzaService.findById(id);
            reply.send(pizza);
        } catch (error) {
            if (error instanceof Error && error.message === "Pizza not found") {
                reply.status(404).send({ error: "Pizza not found" });
            }
        }
    }

}