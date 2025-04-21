import { FastifySchema } from "fastify";

export const createOrderSchema: FastifySchema = {
body: {
  type: "object",
  required: ["customerId", "addressId", "items", "deliveryFee"],
  properties: {
    customerId: { type: "string" },
    addressId: { type: "string" },
    deliveryFee: { type: "number", minimum: 0 },
    items: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["pizzaId", "size", "quantity"],
        properties: {
          pizzaId: { type: "string" },
          size: { 
            type: "string", 
            enum: ["SMALL", "MEDIUM", "LARGE"] 
          },
          quantity: { type: "integer", minimum: 1 },
          notes: { type: "string" }
        }
      }
    }
  },
  additionalProperties: false
},
response: {
  201: {
    type: "object",
    properties: {
      id: { type: "string" },
      customerId: { type: "string" },
      addressId: { type: "string" },
      status: { 
        type: "string",
        enum: ["PENDING", "CONFIRMED", "PREPARING", "READY", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"]
      },
      total: { type: "number" },
      deliveryFee: { type: "number" },
      deliveryTime: { type: ["string", "null"], format: "date-time" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
      items: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            pizzaId: { type: "string" },
            size: { type: "string", enum: ["SMALL", "MEDIUM", "LARGE"] },
            quantity: { type: "integer" },
            price: { type: "number" },
            notes: { type: ["string", "null"] }
          }
        }
      },
      customer: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          phone: { type: ["string", "null"] }
        }
      },
      address: {
        type: "object",
        properties: {
          id: { type: "string" },
          street: { type: "string" },
          number: { type: "string" },
          complement: { type: ["string", "null"] },
          district: { type: "string" },
          city: { type: "string" },
          state: { type: "string" },
          zipCode: { type: "string" }
        }
      }
    }
  }
}
};

export const updateOrderStatusSchema: FastifySchema = {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' }
      }
    },
    body: {
      type: 'object',
      required: ['status'],
      properties: {
        status: { 
          type: 'string',
          enum: ["PENDING", "CONFIRMED", "PREPARING", "READY", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"]
        }
      },
      additionalProperties: false
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          customerId: { type: 'string' },
          addressId: { type: 'string' },
          status: { 
            type: 'string',
            enum: ["PENDING", "CONFIRMED", "PREPARING", "READY", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"]
          },
          total: { type: 'number' },
          deliveryFee: { type: 'number' },
          deliveryTime: { type: ['string', 'null'], format: 'date-time' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          customer: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              phone: { type: ['string', 'null'] }
            }
          },
          address: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              street: { type: 'string' },
              number: { type: 'string' },
              complement: { type: ['string', 'null'] },
              district: { type: 'string' },
              city: { type: 'string' },
              state: { type: 'string' },
              zipCode: { type: 'string' }
            }
          },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                pizzaId: { type: 'string' },
                size: { type: 'string', enum: ["SMALL", "MEDIUM", "LARGE"] },
                quantity: { type: 'integer' },
                price: { type: 'number' },
                notes: { type: ['string', 'null'] },
                Pizza: {
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
                    isAvailable: { type: 'boolean' }
                  }
                }
              }
            }
          }
        }
      }
    }
    };

    export const getOrderItemsSchema: FastifySchema = {
        params: {
          type: 'object',
          required: ['orderId'],
          properties: {
            orderId: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                orderId: { type: 'string' },
                pizzaId: { type: 'string' },
                size: { type: 'string', enum: ["SMALL", "MEDIUM", "LARGE"] },
                quantity: { type: 'integer' },
                price: { type: 'number' },
                notes: { type: ['string', 'null'] },
                Pizza: {
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
                    category: { type: ['string', 'null'] }
                  }
                }
              }
            }
          }
        }
        };
        export const addOrderItemSchema: FastifySchema = {
            params: {
              type: 'object',
              required: ['orderId'],
              properties: {
                orderId: { type: 'string' }
              }
            },
            body: {
              type: 'object',
              required: ['pizzaId', 'size', 'quantity'],
              properties: {
                pizzaId: { type: 'string' },
                size: { 
                  type: 'string', 
                  enum: ['SMALL', 'MEDIUM', 'LARGE'] 
                },
                quantity: { type: 'integer', minimum: 1 },
                notes: { type: 'string' }
              },
              additionalProperties: false
            },
            response: {
              201: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  orderId: { type: 'string' },
                  pizzaId: { type: 'string' },
                  size: { type: 'string', enum: ['SMALL', 'MEDIUM', 'LARGE'] },
                  quantity: { type: 'integer' },
                  price: { type: 'number' },
                  notes: { type: ['string', 'null'] },
                  Pizza: {
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
                      category: { type: ['string', 'null'] }
                    }
                  }
                }
              }
            }
            };

            export const removeOrderItemSchema: FastifySchema = {
                params: {
                  type: 'object',
                  required: ['orderId', 'id'],
                  properties: {
                    orderId: { type: 'string' },
                    id: { type: 'string' }
                  }
                },
                response: {
                  200: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      customerId: { type: 'string' },
                      addressId: { type: 'string' },
                      status: { 
                        type: 'string',
                        enum: ["PENDING", "CONFIRMED", "PREPARING", "READY", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"]
                      },
                      total: { type: 'number' },
                      deliveryFee: { type: 'number' },
                      deliveryTime: { type: ['string', 'null'], format: 'date-time' },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' },
                      items: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: { type: 'string' },
                            pizzaId: { type: 'string' },
                            size: { type: 'string', enum: ["SMALL", "MEDIUM", "LARGE"] },
                            quantity: { type: 'integer' },
                            price: { type: 'number' },
                            notes: { type: ['string', 'null'] },
                            Pizza: {
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
                                category: { type: ['string', 'null'] }
                              }
                            }
                          }
                        }
                      },
                      customer: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          name: { type: 'string' },
                          email: { type: 'string' },
                          phone: { type: ['string', 'null'] }
                        }
                      },
                      address: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          street: { type: 'string' },
                          number: { type: 'string' },
                          complement: { type: ['string', 'null'] },
                          district: { type: 'string' },
                          city: { type: 'string' },
                          state: { type: 'string' },
                          zipCode: { type: 'string' }
                        }
                      }
                    }
                  }
                }
                };