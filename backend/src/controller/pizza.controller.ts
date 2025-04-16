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

}