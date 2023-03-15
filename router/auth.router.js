import { logInHandler, signInHandler } from "../handler/auth.handler.js";
const registerRoutes = {
  schema: {
    tags: ["authorization"],
    summery: "sign up user",
    consumes: ["application/json", "application/x-www-urlencoded"],
    body: {
      type: "object",
      required: ["email", "password", "first_name", "last_name"],
      properties: {
        email: { type: "string" },
        password: { type: "string" },
        first_name: { type: "string", default: "کاربر" },
        last_name: { type: "string", default: "جدید" },
      },
    },
  },
  response: {
    201: {
      type: "object",
    },
  },
  handler: signInHandler,
};
const logInRoutes = {
  schema: {
    tags: ["authorization"],
    summery: "sign up user",
    consumes: ["application/json", "application/x-www-urlencoded"],
    body: {
      type: "object",
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    },
    properties: {},
  },
  response: {
    200: {
      type: "object",
    },
  },
  handler: logInHandler,
};
export default function authRoutes(fastify, options, done) {
  fastify.post("/signUp", registerRoutes);
  fastify.post("/logIn", logInRoutes);
  done();
}
