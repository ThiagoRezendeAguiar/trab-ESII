import { FastifySchema } from "fastify"

export const createCustomerSchema: FastifySchema = {
    body: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
            name: { type: "string", minLength: 3, maxLength: 50 },
            email: { type: "string", format: "email" },
            password: {type: "string", minLength: 5},
            phone: { type: "string", minLength: 10, maxLength: 15 },
        },
        additionalProperties: false,
    },
    response: {
        201: {
            type: "object",
            properties: {
                id: { type: "string" },
                name: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time" },
            },
        },
    }
};

export const loginCustomerSchema: FastifySchema = {
    body: {
      type: "object",
      required: ["email", "password"], 
      properties: {
        email: { 
          type: "string", 
          format: "email"
        },
        password: { 
          type: "string", 
          minLength: 5
        }
      },
      additionalProperties: false
    },
    response: {
      200: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          token: { type: "string" }
        }
      },
      401: {
        type: "object",
        properties: {
          error: { type: "string" }
        }
      }
    }
  };

export const updateCustomerSchema: FastifySchema = {
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
            email: { type: 'string', format: 'email' },
            phone: { type: 'string', minLength: 10, maxLength: 15 },
        },
        additionalProperties: false,
    },
    response: {
        200: {
            type: "object",
            properties: {
                id: { type: "string" },
                name: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time" },
            },
        },
    },
}