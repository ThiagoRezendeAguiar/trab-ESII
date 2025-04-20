import { inject, injectable } from "tsyringe";
import { AddressService } from "../service/address.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateAddressInput, UpdateAddressInput } from "../model/address.model";

@injectable()
export class AddressController {
    constructor(@inject("AddressService")private addressService: AddressService) {}
    
    async getAllAddresses(request: FastifyRequest<{Params: { customerId: string } }>, reply: FastifyReply) {
        const { customerId } = request.params;
        const addresses = await this.addressService.findAllByCustomerId(customerId);
        reply.send(addresses);
    }
    
    async createAddress(request: FastifyRequest<{ Params: { customerId: string }; Body: CreateAddressInput }>, reply: FastifyReply) {
        const { customerId } = request.params;
        const address = request.body;
        const createdAddress = await this.addressService.create(customerId, address);
        reply.status(201).send(createdAddress);
    }
    
    async getAddress(request: FastifyRequest<{ Params: { customerId: string; id: string } }>, reply: FastifyReply) {
        const { customerId, id } = request.params;
        const address = await this.addressService.findById(customerId, id); 
        reply.send(address);
    }   

    async updateAddress(request: FastifyRequest<{ Params: { customerId: string; id: string }; Body: UpdateAddressInput }>, reply: FastifyReply) {
        const { customerId, id } = request.params;
        const address = request.body;
        const updatedAddress = await this.addressService.update(customerId, id, address);
        reply.send(updatedAddress);
    }

    async setDefaultAddress(request: FastifyRequest<{ Params: { customerId: string; id: string } }>, reply: FastifyReply) {
        const { customerId, id } = request.params;
        const address = await this.addressService.updateDefault(customerId, id);
        reply.send(address);
    }

    async deleteAddress(request: FastifyRequest<{ Params: { customerId: string; id: string } }>, reply: FastifyReply) {
        const { customerId, id } = request.params;
        await this.addressService.delete(customerId, id);
        reply.status(204).send();
    }
}