export const addUserDoc = {
  post: {
    summary: "Add a new user",
    description: "Endpoint to add a new user to the system.",
    tags: ["User"],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              firstname: { type: "string" },
              lastname: { type: "string" },
              email: { type: "string" },
              phone: { type: "string" },
              password: { type: "string" },
            },
            example: {
              firstname: "John",
              lastname: "Doe",
              email: "john.doe@example.com",
              phone: "+1234567890",
              password: "mypassword123",
            },
          },
        },
      },
    },
    responses: {
      200: { description: "User added successfully" },
      400: { description: "Bad request, check request payload" },
      500: { description: "Internal server error" },
    },
  },
};

export const loginDocs = {
  post: {
    summary: "User login",
    description: "Endpoint to authenticate a user.",
    tags: ["User"],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              password: { type: "string" },
            },
            required: ["email", "password"],
          },
        },
      },
    },
    responses: {
      200: { description: "User logged in successfully" },
      400: { description: "Bad request, check request payload" },
      401: { description: "Unauthorized, incorrect email or password" },
      500: { description: "Internal server error" },
    },
  },
};

export const updateUserDocs = {
  patch: {
    summary: "Update user details",
    description: "Endpoint to update user details in the system.",
    tags: ["User"],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "string" },
              firstname: { type: "string" },
              lastname: { type: "string" },
              email: { type: "string" },
              phone: { type: "string" },
              password: { type: "string" },
            },
            required: ["userId"],
          },
        },
      },
    },
    responses: {
      200: { description: "User updated successfully" },
      400: { description: "Bad request, check request payload" },
      404: { description: "User not found" },
      500: { description: "Internal server error" },
    },
  },
};
