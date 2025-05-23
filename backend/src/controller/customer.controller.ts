import { inject, injectable } from "tsyringe";
import { CustomerService } from "../service/customer.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCustomerInput, LoginCustomerInput, UpdateCustomerInput } from "../model/customer.model";
import { IParams } from "../@types/fastify";

@injectable()
export class CustomerController {
    constructor(@inject("CustomerService") private customerService: CustomerService) {}

    async createCustomer(request: FastifyRequest<{ Body: CreateCustomerInput }>, reply: FastifyReply) {
        const newCustomer = await this.customerService.create(request.body);
        reply.status(201).send(newCustomer);
    }

    async loginCustomer(request: FastifyRequest<{ Body: LoginCustomerInput }>, reply: FastifyReply) {
        const loginCostumer = await this.customerService.findFirst(request.body);
        reply.status(200).send(loginCostumer);
    }

    async getCustomers(request: FastifyRequest, reply: FastifyReply) {
        const customers = await this.customerService.findAll();
        return reply.status(200).send(customers);
    }

    async getCustomerById(request: FastifyRequest<{ Params: IParams }>, reply: FastifyReply) {
        const { id } = request.params;
        const customer = await this.customerService.findById(id);
        reply.send(customer);
    }

    async updateCustomer(
        request: FastifyRequest<{ Params: IParams; Body: UpdateCustomerInput }>, reply: FastifyReply
    ) {
        const { id } = request.params;
        const updatedCustomer = await this.customerService.update(id, request.body);
        reply.send(updatedCustomer);
    }

    async deleteCustomer(request: FastifyRequest<{ Params: IParams }>, reply: FastifyReply) {
        const { id } = request.params;
        await this.customerService.delete(id);
        reply.status(204).send();
    }
}