import * as dotenv from "dotenv";
dotenv.config();
import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});
import { Sequelize } from "sequelize";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { swaggerConfig, swaggerUIConfig } from "./config/swagger.config.js";
// postgres
export const sequelize = new Sequelize(
  process.env.POSTGRES_NAME,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: "localhost",
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    logging: false,
  }
);
const DBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("postgres connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
DBConnection();
// routes
import userRoutes from "./router/user.router.js";
import authRoutes from "./router/auth.router.js";
// swagger
fastify.register(fastifySwagger, swaggerConfig);
fastify.register(fastifySwaggerUi, swaggerUIConfig);
// routes
fastify.register(userRoutes, { prefix: "/user" });
fastify.register(authRoutes, { prefix: "/auth" });

fastify.listen({ port: process.env.APPLICATION_PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info("Server Started");
});
