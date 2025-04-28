import { FastifyInstance } from "fastify";
import { container } from "../config/container";
import { CustomerController } from "../controller/customer.controller";
import { createCustomerSchema, loginCustomerSchema, updateCustomerSchema } from "../schema/customer.schema";
import { AuthGuard } from "../middlewares/authGuard";

export default async function customerRoutes(fastify:FastifyInstance) {
    const customerController = container.resolve(CustomerController);
    const authGuard = container.resolve(AuthGuard);

    fastify.get("/", customerController.getCustomers.bind(customerController));
    fastify.get("/:id", customerController.getCustomerById.bind(customerController));
    fastify.post("/", {schema: createCustomerSchema},customerController.createCustomer.bind(customerController));
    fastify.post("/login", {schema: loginCustomerSchema},customerController.loginCustomer.bind(customerController));
    fastify.put("/:id", {schema: updateCustomerSchema},customerController.updateCustomer.bind(customerController));
    fastify.delete("/:id", customerController.deleteCustomer.bind(customerController));
}