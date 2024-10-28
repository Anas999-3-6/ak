export const addPayrollDocs = {
    post: {
      summary: "Add payroll",
      description: "Endpoint to add a new payroll entry to the system.",
      tags: ["Payroll"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                staff: { type: "string" },
                basic_salary: { type: "number" },
                allowances: { type: "number" },
                tds: { type: "number" },
              },
              example: {
                staff: "615b05c4a98e44bcbef1c1e5",
                basic_salary: 5000,
                allowances: 1000,
                tds: 500,
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Payroll added successfully" },
        400: { description: "Bad request, check request payload" },
        500: { description: "Internal server error" },
      },
    },
  };
  

  export const getAllPayrollDocs = {
    get: {
      summary: "Get all payrolls",
      description: "Retrieve details of all payrolls in the system.",
      tags: ["Payroll"],
      responses: {
        200: {
          description: "Successful operation. Returns all payroll details.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    staff: { type: "string" },
                    basic_salary: { type: "number" },
                    allowances: { type: "number" },
                    tds: { type: "number" },
                  },
                },
              },
            },
          },
        },
        404: { description: "Payroll details not found" },
        500: { description: "Internal server error" },
      },
    },
  };