export const addPumpDocs = {
    post: {
      summary: "Add a new pump",
      description: "Endpoint to add a new pump to the system.",
      tags: ["Pump"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                code: { type: "string" },
                desc: { type: "string" },
                fuel: {
                  type: "string",
                  format: "ObjectId",
                  description: "The ID of the fuel type.",
                },
              },
              example: {
                code: "pump123",
                desc: "Description of the pump",
                fuel: "615b05c4a98e44bcbef1c1e6", // Example fuel ID
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Pump added successfully" },
        400: { description: "Bad request, check request payload" },
        500: { description: "Internal server error" },
      },
    },
  };

  export const getPumpDetailsDocs = {
    get: {
      summary: "Get all pump details",
      description: "Retrieve details of all pumps in the system.",
      tags: ["Pump"],
      responses: {
        200: {
          description: "Successful operation. Returns all pump details.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: { type: "string" },
                    desc: { type: "string" },
                    fuel: { type: "string", description: "The ID of the fuel type." },
                    isActive: { type: "boolean" },
                    created_at: { type: "string", format: "date-time" },
                    updated_at: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
        404: { description: "Pump details not found." },
        500: { description: "Internal server error." },
      },
    },
  };