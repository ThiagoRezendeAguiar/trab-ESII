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

export const updatePizzaSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string' }
        }
    },
    body: {
        type: 'object',
        properties: {
            name: { type: 'string', minLength: 3, maxLength: 50 },
            description: { type: 'string', minLength: 10, maxLength: 255 },
            price: { type: 'number', minimum: 0 },
            ingredients: {
                type: 'array',
                items: { type: 'string' },
                minItems: 1
            },
            isAvailable: { type: 'boolean' }
        },
        
        minProperties: 1,
        additionalProperties: false
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                description: { type: ['string', 'null'] },
                price: { type: 'number' },
                ingredients: {
                    type: 'array',
                    items: { type: 'string' }
                },
                isAvailable: { type: 'boolean' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
            }
        }
    }

    
  };
  export const updateAvailabilitySchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string' }
        }
    },
    body: {
        type: 'object',
        required: ['isAvailable'],
        properties: {
            isAvailable: { type: 'boolean' }
        },
        additionalProperties: false
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                description: { type: ['string', 'null'] },
                price: { type: 'number' },
                ingredients: {
                    type: 'array',
                    items: { type: 'string' }
                },
                isAvailable: { type: 'boolean' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
            }
        }
    }
  };