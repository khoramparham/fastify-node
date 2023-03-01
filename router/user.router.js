export default function userRoutes(fastify, options, done) {
  fastify.get("/", async function (request, reply) {
    return { hello: "World" };
  });
  done();
}
