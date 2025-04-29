import { FastifyInstance } from "fastify";
import { container } from "../config/container";
import { CustomerController } from "../controller/customer.controller";
import { createCustomerSchema, loginCustomerSchema, updateCustomerSchema } from "../schema/customer.schema";
import { AuthGuard } from "../middlewares/authGuard";
import { IParams, UpdateCustomerRoute} from "../@types/fastify";

export default async function customerRoutes(fastify:FastifyInstance) {
    const customerController = container.resolve(CustomerController);
    const authGuard = container.resolve(AuthGuard);

    fastify.post("/login", {schema: loginCustomerSchema},customerController.loginCustomer.bind(customerController));
    fastify.post("/register", {schema: createCustomerSchema},customerController.createCustomer.bind(customerController));

    fastify.get("/", {preHandler: authGuard.execute.bind(authGuard)}, customerController.getCustomers.bind(customerController));

    fastify.get<{ Params: IParams }>(
        "/:id",
        {
          preHandler: authGuard.execute.bind(authGuard)
        },
        customerController.getCustomerById.bind(customerController)
    );
    fastify.put<UpdateCustomerRoute>(
        "/:id",
        {
          preHandler: authGuard.execute.bind(authGuard),
          schema: updateCustomerSchema
        },
        customerController.updateCustomer.bind(customerController)
      );
    fastify.delete<{ Params: IParams }>("/:id", 
        {
            preHandler: authGuard.execute.bind(authGuard)
        },
        customerController.deleteCustomer.bind(customerController)
    );
}