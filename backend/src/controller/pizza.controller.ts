import { FastifyReply, FastifyRequest } from "fastify";
import { PizzaService } from "../service/pizza.service";
import { CreatePizzaInput, UpdatePizzaInput } from "../model/pizza.model";
import { inject, injectable } from "tsyringe";

@injectable()
export class PizzaController {
  constructor(@inject("PizzaService") private pizzaService: PizzaService) {}

  async createPizza(
    request: FastifyRequest<{ Body: CreatePizzaInput }>,
    reply: FastifyReply
  ) {
    const newPizza = await this.pizzaService.create(request.body);
    reply.status(201).send(newPizza);
  }

  async getPizzas(request: FastifyRequest, reply: FastifyReply) {
    const pizzas = await this.pizzaService.findAll();
    reply.send(pizzas);
  }

  async getPizzaById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const pizza = await this.pizzaService.findById(id);
    reply.send(pizza);
  }

  async updatePizza(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdatePizzaInput }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const updatedPizza = await this.pizzaService.update(id, request.body);
    reply.send(updatedPizza);
  }

  async updateAvailability(
    request: FastifyRequest<{
      Params: { id: string };
      Body: { isAvailable: boolean };
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const { isAvailable } = request.body;

    const updatedPizza = await this.pizzaService.updateAvailability(
      id,
      isAvailable
    );
    reply.send(updatedPizza);
  }

  async deletePizza(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
    const { id } = request.params;
    await this.pizzaService.delete(id);
    reply.status(204).send();
}
}
