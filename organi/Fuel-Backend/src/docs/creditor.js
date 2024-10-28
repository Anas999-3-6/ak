export const addCreditorDocs = {
    post: {
        summary: "Add a new creditor",
        description: "Endpoint to add a new creditor to the system.",
        tags: ["Creditor"],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            type: { type: "string" },
                            name: { type: "string" },
                            email: { type: "string" },
                            phone: { type: "string" },
                            office_address: { type: "string" },
                        },
                        required: ["type", "name", "email", "phone", "office_address"],
                        example: {
                            type: "Type",
                            name: "Creditor Name",
                            email: "creditor@example.com",
                            phone: "+1234567890",
                            office_address: "Creditor Office Address",
                        },
                    },
                },
            },
        },
        responses: {
            200: { description: "Creditor added successfully" },
            400: { description: "Bad request, check request payload" },
            500: { description: "Internal server error" },
        },
    },
};


export const fetchCreditorDocs = {
    get: {
        summary: "Get all creditors",
        description: "Endpoint to retrieve details of all creditors.",
        tags: ["Creditor"],
        responses: {
            200: {
                description: "Successful operation. Returns all creditor details.",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    type: { type: "string" },
                                    name: { type: "string" },
                                    email: { type: "string" },
                                    phone: { type: "string" },
                                    office_address: { type: "string" },
                                    isActive: { type: "boolean" },
                                    created_at: { type: "string", format: "date-time" },
                                    updated_at: { type: "string", format: "date-time" },
                                },
                            },
                        },
                    },
                },
            },
            404: { description: "Creditor details not found" },
            500: { description: "Internal server error" },
        },
    },
};
