import "./config/container"
import "reflect-metadata";
import fastify from "fastify";
import { env } from "./config/env";
import errorHandler from "./plugin/error-handler";
import { registerRoutes } from "./routes";
import cors from "@fastify/cors";

const server = fastify({logger: true});


server.register(errorHandler);
server.register(cors, {
   
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  });


server.get("/", async (request, reply) => {
    return { status: "Ok" };
});

const start = async () => {
    try {

        await registerRoutes(server);

        await server.listen({port: env.PORT});
        console.log(`Server is running on port ${env.PORT}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

start();