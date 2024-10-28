export const addSavingDocs = {
    post: {
      summary: "Add a new saving",
      description: "Endpoint to add a new saving to the system.",
      tags: ["Saving"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                bank: { type: "string" },
                amount: { type: "number" },
                note: { type: "string" },
                pass_code: { type: "string" },
              },
              required: ["bank", "amount", "note", "pass_code"],
              example: {
                bank: "Bank Name",
                amount: 1000,
                note: "Saving note",
                pass_code: "password123",
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Saving added successfully" },
        400: { description: "Bad request, check request payload" },
        500: { description: "Internal server error" },
      },
    },
  };


  export const fetchAllSavingDocs = {
    get: {
      summary: "Get all savings",
      description: "Endpoint to fetch all savings from the system.",
      tags: ["Saving"],
      responses: {
        200: {
          description: "Successful operation. Returns all savings.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    bank: { type: "string" },
                    amount: { type: "number" },
                    note: { type: "string" },
                    pass_code: { type: "string" },
                    created_at: { type: "string", format: "date-time" },
                    updated_at: { type: "string", format: "date-time" },
                  },
                },
              },
              example: [
                {
                  bank: "Bank Name",
                  amount: 1000,
                  note: "Saving note",
                  pass_code: "password123",
                  created_at: "2024-02-01T12:00:00Z",
                  updated_at: "2024-02-01T12:00:00Z",
                },
                // Add more examples if needed
              ],
            },
          },
        },
        404: { description: "Saving details not found" },
        500: { description: "Internal server error" },
      },
    },
  };
  
  