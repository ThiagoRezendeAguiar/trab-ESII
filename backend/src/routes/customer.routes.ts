import { FastifyInstance } from "fastify";
import { container } from "../config/container";
import { CustomerController } from "../controller/customer.controller";
import { createCustomerSchema, updateCustomerSchema } from "../schema/customer.schema";

export default async function customerRoutes(fastify:FastifyInstance) {
    const customerController = container.resolve(CustomerController);

    fastify.get("/", customerController.getCustomers.bind(customerController));
    fastify.get("/:id", customerController.getCustomerById.bind(customerController));
    fastify.post("/", {schema: createCustomerSchema},customerController.createCustomer.bind(customerController));
    fastify.put("/:id", {schema: updateCustomerSchema},customerController.updateCustomer.bind(customerController));
    fastify.delete("/:id", customerController.deleteCustomer.bind(customerController));
}