import { FastifySchema } from "fastify";

export const createAdressSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['street', 'number', 'district', 'city', 'state', 'zipCode'],
        properties: {
            street: { type: 'string' },
            number: { type: 'string' },
            complement: { type: 'string' },
            district: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            zipCode: { type: 'string' },
            isDefault: { type: 'boolean' },
        },
        additionalProperties: false,
    },
    response: {
        201: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                street: { type: 'string' },
                number: { type: 'string' },
                complement: { type: 'string' },
                district: { type: 'string' },
                city: { type: 'string' },
                state: { type: 'string' },
                zipCode: { type: 'string' },
                isDefault: { type: 'boolean' },
                customerId: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
            },
        }
    }
};

export const updateAdressSchema: FastifySchema = {
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
            street: { type: 'string' },
            number: { type: 'string' },
            complement: { type: 'string' },
            district: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            zipCode: { type: 'string' },
            isDefault: { type: 'boolean' },
        },
        additionalProperties: false,
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                street: { type: 'string' },
                number: { type: 'string' },
                complement: { type: 'string' },
                district: { type: 'string' },
                city: { type: 'string' },
                state: { type: 'string' },
                zipCode: { type: 'string' },
                isDefault: { type: 'boolean' },
                customerId: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
            },
        }
    }
};