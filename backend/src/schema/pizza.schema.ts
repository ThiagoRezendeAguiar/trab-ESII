import { FastifySchema } from "fastify";

export const createPizzaSchema: FastifySchema = {
    body: {
        type: "object",
        required: ["name", "price", "ingredients"],
        properties: {
            name: { type: "string", minLength: 3, maxLength: 50},
            description: { type: "string", minLength: 10 ,maxLength: 255 },
            price: { type: "number", minimum: 0 },
            ingredients: {
                type: "array",
                items: { type: "string" },
                minItems: 1,
            },
        },
        additionalProperties: false,
    },
    response: {
        201: {
            type: "object",
            properties: {
                id: { type: "string" },
                name: { type: "string" },
                description: { type: "string" },
                price: { type: "number" },
                ingredients: {
                    type: "array",
                    items: { type: "string" },
                },
                isAvailable: { type: "boolean" },
                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time" },
            },
        },
    }
};