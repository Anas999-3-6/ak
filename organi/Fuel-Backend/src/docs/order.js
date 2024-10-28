export const addOrderDocs = {
    post: {
      summary: "Add a new order",
      description: "Endpoint to add a new order to the system.",
      tags: ["Order"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                type: { type: "string" },
                liters: { type: "number" },
                cost: { type: "number" },
                supplier: {
                  type: "string",
                  format: "ObjectId",
                  description: "The ID of the supplier.",
                },
                fuel: {
                  type: "string",
                  format: "ObjectId",
                  description: "The ID of the fuel type.",
                },
              },
              example: {
                type: "Regular",
                liters: 50,
                cost: 100,
                supplier: "615b05c4a98e44bcbef1c1e5",
                fuel: "615b05c4a98e44bcbef1c1e6",
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Order added successfully" },
        400: { description: "Bad request, check request payload" },
        500: { description: "Internal server error" },
      },
    },
  };


  export const getAllOrdersDocs = {
    get: {
      summary: "Get all order details",
      description: "Retrieve details of all orders in the system.",
      tags: ["Order"],
      responses: {
        200: {
          description: "Successful operation. Returns all order details.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    orderId: { type: "string" },
                    type: { type: "string" },
                    liters: { type: "number" },
                    cost: { type: "number" },
                  },
                },
              },
              example: [
                {
                  orderId: "123456",
                  type: "Regular",
                  liters: 50,
                  cost: 100,
                },
              ],
            },
          },
        },
        404: { description: "Order details not found." },
        500: { description: "Internal server error." },
      },
    },
  };