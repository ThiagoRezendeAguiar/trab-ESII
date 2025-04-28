import "fastify";
import { Customer, PrismaClient } from "@prisma/client";

declare module "fastify" {
    interface FastifyInstance {
        prisma: PrismaClient;
    }

    interface FastifyRequest {
        customer?: Omit<Customer, "password"> | null; 
    }
}