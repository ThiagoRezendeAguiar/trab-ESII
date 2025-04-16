import "./config/container"
import "reflect-metadata";
import fastify from "fastify";
import { env } from "./config/env";
import errorHandler from "./plugin/error-handler";
import pizzaRoutes from "./routes/pizza.routes";

const server = fastify({logger: true});

// Plugins
server.register(errorHandler);

// Routes
server.register(pizzaRoutes, {prefix: "/api/pizza"});

// Health check route
server.get("/", async (request, reply) => {
    return { status: "Ok" };
});

const start = async () => {
    try {
        await server.listen({port: env.PORT});
        console.log(`Server is running on port ${env.PORT}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

start();