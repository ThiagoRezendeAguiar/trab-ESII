import { inject, injectable } from "tsyringe";
import { CustomerService } from "../service/customer.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCustomerInput, UpdateCustomerInput } from "../model/customer.model";

@injectable()
export class CustomerController {
    constructor(@inject("CustomerService") private customerService: CustomerService) {}

    async createCustomer(request: FastifyRequest<{ Body: CreateCustomerInput }>, reply: FastifyReply) {
        const newCustomer = await this.customerService.create(request.body);
        reply.status(201).send(newCustomer);
    }

    async getCustomers(request: FastifyRequest, reply: FastifyReply) {
        const customers = await this.customerService.findAll();
        reply.send(customers);
    }

    async getCustomerById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        const customer = await this.customerService.findById(id);
        reply.send(customer);
    }

    async updateCustomer(
        request: FastifyRequest<{ Params: { id: string }; Body: UpdateCustomerInput }>, reply: FastifyReply
    ) {
        const { id } = request.params;
        const updatedCustomer = await this.customerService.update(id, request.body);
        reply.send(updatedCustomer);
    }

    async deleteCustomer(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        await this.customerService.delete(id);
        reply.status(204).send();
    }
}