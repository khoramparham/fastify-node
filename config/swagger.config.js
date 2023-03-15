export const swaggerConfig = {
  swagger: {
    info: {
      title: "telegram",
      description: "telegram bot",
      version: "0.1.0",
      contact: {
        name: "parham khoram",
        url: "https://www.linkedin.com/in/khoramparham",
        email: "khoramparham@gmail.com",
      },
    },
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "authorization",
        in: "header",
      },
    },
    security: [{ apiKey: [] }],
    // externalDocs: {
    //   url: "https://swagger.io",
    //   description: "telegram bot ",
    // },
    host: "localhost:5000",
    schemes: ["http"],
    // consumes: ["application/json"],
    // produces: ["application/json"],
    tags: [{ name: "user", description: "userRoutes" }],
  },
};

export const swaggerUIConfig = { prefix: "swagger", exposeRoute: true };
