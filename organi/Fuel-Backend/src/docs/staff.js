export const addStaffDocs = {
  post: {
    summary: "Add a new staff",
    description: "Endpoint to add a new staff to the system.",
    tags: ["Staff"],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              designation: { type: "string" },
              phone: { type: "number" },
              email: { type: "string" },
              address: { type: "string" },
              qualification: { type: "string" },
              full_name: { type: "string" },
            },
            required: [
              "designation",
              "phone",
              "email",
              "address",
              "qualification",
              "full_name",
            ],
          },
        },
      },
    },
    responses: {
      200: { description: "Staff added successfully" },
      400: { description: "Bad request, check request payload" },
      500: { description: "Internal server error" },
    },
  },
};

export const getAllStaffDocs = {
  get: {
    summary: "Get all staff",
    description: "Retrieve details of all staff in the system.",
    tags: ["Staff"],
    responses: {
      200: {
        description: "Successful operation. Returns all staff details.",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  designation: { type: "string" },
                  phone: { type: "number" },
                  email: { type: "string" },
                  address: { type: "string" },
                  qualification: { type: "string" },
                  reg_number: { type: "string" },
                },
              },
            },
          },
        },
      },
      404: { description: "Staff details not found" },
      500: { description: "Internal server error" },
    },
  },
};
