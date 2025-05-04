import { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { PaymentController } from "../controller/payment.controller";

export default async function paymentRoutes(fastify: FastifyInstance) {
    const paymentController = container.resolve(PaymentController);

    fastify.post("/", paymentController.createIntent.bind(paymentController));
}