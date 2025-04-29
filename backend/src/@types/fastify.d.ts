import "fastify";
import { Customer, PrismaClient } from "@prisma/client";
import { UpdateCustomerInput } from "../model/customer.model";

declare module "fastify" {
    interface FastifyInstance {
        prisma: PrismaClient;
    }

    interface FastifyRequest {
        customer?: Omit<Customer, "password"> | null; 
    }
}


export interface IParams {
    id: string; 
}

export interface UpdateCustomerRoute {
    Params: IParams;
    Body: UpdateCustomerInput;
  }