import { inject, injectable } from "tsyringe";
import { CreatePizzaInput,UpdatePizzaInput } from "../model/pizza.model";
import { PrismaClient } from "@prisma/client";
import { NotFoundError,ValidationError } from "../utils/errors";

@injectable()
export class PizzaService {
    constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

    async create(data: CreatePizzaInput){
        return this.prisma.pizza.create({
            data
        });
    }
    async findAll() {
        return this.prisma.pizza.findMany();
    }

    async findById(id: string) {
        const pizza = await this.prisma.pizza.findUnique({
            where: { id }
        });
        if (!pizza) {
            throw new NotFoundError("Pizza");
        }
        return pizza;
    }

    async update(id: string, data: UpdatePizzaInput) {
        await this.findById(id);
        return this.prisma.pizza.update({
            where: { id },
            data
        });
    }

    async updateAvailability(id: string, isAvailable: boolean) {
        if (typeof isAvailable !== 'boolean') {
            throw new ValidationError("isAvailable must be a boolean value");
        }
        await this.findById(id);
        return this.prisma.pizza.update({
            where: { id },
            data: { isAvailable }
        });
    }

    async delete(id: string) {
        await this.findById(id);
        return this.prisma.pizza.delete({
            where: { id }
        });
    }
}