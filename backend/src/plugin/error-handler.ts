import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { AppError } from "../utils/errors";

export default fp(async (fastify: FastifyInstance) => {
    fastify.setErrorHandler((error, request, reply) => {
        fastify.log.error(error);

        if (error instanceof AppError) {
            return reply.status(error.statusCode).send({
                name: error.name,
                message: error.message,
            });
        }

        if (error.validation) {
            return reply.status(400).send({
                name: "ValidationError",
                message: "Validation error in the data provided",
                details: error.validation,
            });
        }

        return reply.status(500).send({
            error: "InternalServerError",
            message: "Internal server error",
        });
    });
});