export const addSalesDocs = {
    post: {
      summary: "Add sales",
      description: "Endpoint to add sales data to the system.",
      tags: ["Sales"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                liter: { type: "number" },
                amount: { type: "number" },
                staff: { type: "string", format: "ObjectId", description: "The ID of the staff" },
                fuel: { type: "string", format: "ObjectId", description: "The ID of the fuel" },
                pump: { type: "string", format: "ObjectId", description: "The ID of the pump" },
              },
              example: {
                liter: 50,
                amount: 100,
                staff: "615b05c4a98e44bcbef1c1e5",
                fuel: "615b05c4a98e44bcbef1c1e6",
                pump: "615b05c4a98e44bcbef1c1e7",
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Sales added successfully" },
        400: { description: "Bad request, check request payload" },
        500: { description: "Internal server error" },
      },
    },
  };

  export const fetchAllSalesDocs = {
    get: {
      summary: "Get all sales",
      description: "Endpoint to retrieve details of all sales in the system.",
      tags: ["Sales"],
      responses: {
        200: {
          description: "Successful operation. Returns all sales details.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    liter: { type: "number" },
                    amount: { type: "number" },
                    staff: { type: "string", description: "The ID of the staff" },
                    fuel: { type: "string", description: "The ID of the fuel" },
                    pump: { type: "string", description: "The ID of the pump" },
                    created_at: { type: "string", format: "date-time" },
                    updated_at: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
        404: { description: "Sales details not found" },
        500: { description: "Internal server error" },
      },
    },
  };
  