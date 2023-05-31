import { User } from "../model/user.model.js";
import { fastify } from "../server.js";
export const getUserMiddleWare = async (req, reply, next) => {
  const authorization = req?.headers?.authorization;
  if (!authorization)
    reply.status(401).send({
      statuscode: 401,
      message: "you need to authorization",
    });
  const [bearer, token] = authorization.toString().split(" ");
  if (bearer && bearer.toLowerCase() == "bearer") {
    const result = fastify.jwt.verify(token);
    if (typeof result == "string") {
      return reply.status(400).send({
        statuscode: 400,
        message: result,
      });
    }
    const { email } = result;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user)
      return reply.status(401).send({ statusCode: 401, message: "please try to login " });
    req.user = user.dataValues;
    next();
  } else {
    reply.status(401).send({
      statusCode: 401,
      message: "your token not valid bearer token",
    });
  }
};
