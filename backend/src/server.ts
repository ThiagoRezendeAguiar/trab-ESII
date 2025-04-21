import fastify from "fastify";
import { env } from "./config/env";
import prismaPlugin from "./plugins/prisma";

const server = fastify({logger: true});

// Plugins
server.register(prismaPlugin);

// Routes
server.get("/", async (request, reply) => {
    return { status: "Ok" };
});

const start = async () => {
    try {
        await server.listen({port: env.PORT});
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

start();