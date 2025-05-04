import { stripe } from "../config/stripe";
import { injectable } from "tsyringe";

@injectable()
export class PaymentService {
    async createPaymentIntent(amount: number, currency: string) {
        const  paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        return paymentIntent;
    }
}