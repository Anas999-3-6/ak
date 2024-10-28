export const fuelTypeDocs = {
    get: {
        summary: "Get fuel details",
        description: "Retrieve details of available fuel types.",
        tags: ["Fuel"],
        responses: {
          200: {
            description: "Successful operation. Returns fuel details.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        description: "The name of the fuel type.",
                      },
                      qty: {
                        type: "number",
                        description: "The quantity of fuel available.",
                      },
                      status: {
                        type: "string",
                        description: "The status of the fuel.",
                      },
                      id: {
                        type: "string",
                        description: "The unique identifier of the fuel.",
                      },
                    },
                  },
                },
              },
            },
          },
          404: { description: "Fuel details not found." },
          500: { description: "Internal server error." },
        },
      },
}