import { signUpHandler } from "../handler/auth.handler";
const registerRoutes = {
  schema: {
    tags: ["authorization"],
    summery: {},
    consumes: {},
    body: { type: "object", properties: {} },
    properties: {},
  },
  response: {
    200: {},
  },
  handler: signUpHandler,
};
export default function authRoutes(fastify, options, done) {
  fastify.post("/signUp", registerRoutes);
  fastify.get("/login", registerRoutes);
  done();
}
