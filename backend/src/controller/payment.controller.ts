import { inject, injectable } from "tsyringe";
import { PaymentService } from "../service/payment.service";
import { FastifyReply, FastifyRequest } from "fastify";

@injectable()
export class PaymentController {
    constructor(@inject("PaymentService") private paymentService: PaymentService) {}

    async createIntent(request: FastifyRequest<{Body: {amount: number, currency: string}}>, reply: FastifyReply) {
        const paymentIntent = await this.paymentService.createPaymentIntent(request.body.amount, request.body.currency);
        reply.send({intentclientSecret: paymentIntent.client_secret})
    }
}