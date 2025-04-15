import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

async function prismaPlugin(fastify: FastifyInstance) {
    try {
        await prisma.$connect();
        fastify.log.info("Prisma connected");
    } catch (err) {
        fastify.log.error("Prisma connection error:", err);
        process.exit(1);
    }

    fastify.decorate("prisma", prisma);

    fastify.addHook("onClose", async (instance) => {
        try {
            await instance.prisma.$disconnect();
            instance.log.info("Prisma disconnected");
        } catch (err) {
            instance.log.error("Prisma disconnection error:", err);
        }
    });

}

export default fp(prismaPlugin);