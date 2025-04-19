import { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { AddressController } from "../controller/address.controller";

export default async function addressRoutes(fastify: FastifyInstance) {
    const addressController = container.resolve(AddressController);

    fastify.post("/:customerId/addresses", addressController.createAddress.bind(addressController));
    fastify.get("/:customerId/addresses",addressController.getAllAddresses.bind(addressController));
    fastify.get("/:customerId/addresses/:id", addressController.getAddress.bind(addressController));
    fastify.put("/:customerId/addresses/:id", addressController.updateAddress.bind(addressController));
    fastify.patch("/:customerId/addresses/:id/set-default", addressController.setDefaultAddress.bind(addressController));
    fastify.delete("/:customerId/addresses/:id", addressController.deleteAddress.bind(addressController));

}