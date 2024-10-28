 export const supplierStatusDocs = {
    get: {
        summary: "Get supplier status",
        description: "Retrieve the status of suppliers.",
        tags: ["Supplier"],
        responses: {
          200: {
            description: "Successful operation. Returns supplier status.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      code: {
                        type: "string",
                        description: "The status code of the supplier.",
                      },
                      description: {
                        type: "string",
                        description:
                          "The description of the supplier status.",
                      },
                    },
                  },
                },
              },
            },
          },
          404: { description: "Supplier status not found." },
          500: { description: "Internal server error." },
        },
      },
}


export const addSupplierDocs = {
    post: {
        summary: "Add a new supplier",
        description: "Endpoint to add a new supplier to the system.",
        tags: ["Supplier"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  representative: { type: "string" },
                  phone: { type: "string" },
                  email: { type: "string" },
                  address: { type: "string" },
                  supplier_type: {
                    type: "string",
                    description: "The ID of the supplier type.",
                  },
                },
                example: {
                  name: "Abhishek",
                  representative: "ola",
                  phone: "9993064875",
                  email: "soniabhi3568@gmail.com",
                  address: "t64",
                  supplier_type: "65b8a2d5a8a4b466aebd16fd",
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Supplier added successfully" },
          400: { description: "Bad request, check request payload" },
          500: { description: "Internal server error" },
        },
      },
}

export const fetchAllSupplierDocs = {
    get: {
        summary: "Get all supplier details",
        description: "Retrieve details of all suppliers in the system.",
        tags: ["Supplier"],
        responses: {
          200: {
            description:
              "Successful operation. Returns all supplier details.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        description: "The name of the supplier.",
                      },
                      representative: {
                        type: "string",
                        description: "The representative of the supplier.",
                      },
                      phone: {
                        type: "string",
                        description: "The phone number of the supplier.",
                      },
                      email: {
                        type: "string",
                        description: "The email address of the supplier.",
                      },
                      address: {
                        type: "string",
                        description: "The address of the supplier.",
                      },
                      supplier_type: {
                        type: "string",
                        description: "The type of the supplier.",
                      },
                    },
                  },
                },
              },
            },
          },
          404: { description: "Supplier details not found." },
          500: { description: "Internal server error." },
        },
      },
}