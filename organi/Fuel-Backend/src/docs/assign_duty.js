export const addDutyDocs = {
    post: {
      summary: "Assign duty",
      description: "Endpoint to assign duty to a staff member.",
      tags: ["Duty"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                current_reading: { type: "number" },
                pump: { type: "string", description: "The ID of the pump." },
                fuel: { type: "string", description: "The ID of the fuel type." },
                staff: { type: "string", description: "The ID of the staff member." },
              },
              required: ["current_reading", "pump", "fuel", "staff"],
              example: {
                current_reading: 10000,
                pump: "615b05c4a98e44bcbef1c1e5",
                fuel: "615b05c4a98e44bcbef1c1e6",
                staff: "615b05c4a98e44bcbef1c1e7",
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Duty assigned successfully" },
        400: { description: "Bad request, check request payload" },
        500: { description: "Internal server error" },
      },
    },
  };


  export const fetchAllDutyDocs = {
    get: {
      summary: "Get all duty assignments",
      description: "Endpoint to retrieve details of all duty assignments.",
      tags: ["Duty"],
      responses: {
        200: {
          description: "Successful operation. Returns all duty assignments.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    current_reading: { type: "number" },
                    pump: { type: "string", description: "The ID of the pump." },
                    fuel: { type: "string", description: "The ID of the fuel type." },
                    staff: { type: "string", description: "The ID of the staff member." },
                    isActive: { type: "boolean" },
                    created_at: { type: "string", format: "date-time" },
                    updated_at: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
        404: { description: "Duty assignments not found" },
        500: { description: "Internal server error" },
      },
    },
  };
  