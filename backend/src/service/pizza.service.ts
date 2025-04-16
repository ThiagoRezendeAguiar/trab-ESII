import { inject, injectable } from "tsyringe";
import { CreatePizzaInput } from "../model/pizza.model";
import { PrismaClient } from "@prisma/client";

@injectable()
export class PizzaService {
    constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

    async create(data: CreatePizzaInput){
        return this.prisma.pizza.create({
            data
        });
    }
}