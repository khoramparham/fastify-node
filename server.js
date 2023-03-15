import * as dotenv from "dotenv";
dotenv.config();
import Fastify from "fastify";
export const fastify = Fastify({
  logger: true,
});
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { swaggerConfig, swaggerUIConfig } from "./config/swagger.config.js";
import cors from "@fastify/cors";
// postgres
import "./config/sequelize.config.js";
// cors
fastify.register(cors);
//  bcrypt
import fastifyBcrypt from "fastify-bcrypt";
fastify.register(fastifyBcrypt, { saltWorkFactor: 12 });
// JWT
import fastifyJwt from "@fastify/jwt";
fastify.register(fastifyJwt, { secret: process.env.SECRET_KEY });
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
