import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { NotFoundError } from "../utils/errors";
import { CreateCustomerInput, UpdateCustomerInput } from "../model/customer.model";

@injectable()
export class CustomerService {
    constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

    async create(data: CreateCustomerInput) {
        return this.prisma.customer.create({
            data
        });
    }

    async findAll() {
        return this.prisma.customer.findMany();
    }

    async findById(id: string) {
        const customer = await this.prisma.customer.findUnique({
            where: { id }
        });
        if (!customer) {
            throw new NotFoundError("Customer");
        }
        return customer;
    }

    async update(id: string, data: UpdateCustomerInput) {
        const customer = await this.findById(id);
        if (!customer) {
            throw new NotFoundError("Customer");
        }
        return this.prisma.customer.update({
            where: { id },
            data
        });
    }

    async delete(id: string) {
        const customer = await this.findById(id);
        if (!customer) {
            throw new NotFoundError("Customer");
        }
        return this.prisma.customer.delete({
            where: { id }
        });
    }
}