const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Guestara API",
      version: "1.0.0",
      description: "API documentation for Guestara",
    },
    servers: [
      {
        url: "http://localhost:{port}",
        description: "Development server",
        variables: {
          port: {
            default: "3000",
          },
        },
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"],
};

export default swaggerOptions;
