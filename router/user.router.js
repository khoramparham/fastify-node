import {
  findAllUsersHandler,
  findMastersHandler,
  getProfileUser,
  updateUserProfileHandler,
} from "../handler/user.handler.js";
import { getUserMiddleWare } from "../utils/getUser.js";
const user = {
  type: "object",
  properties: {
    id: { type: "number" },
    first_name: { type: "string" },
    last_name: { type: "string" },
    phone: { type: "string" },
    email: { type: "string" },
  },
};
const updateProfileRoutes = {
  schema: {
    tags: ["user"],
    security: [{ apiKey: [] }],
    summery: "update user information",
    body: {
      type: "object",
      properties: {
        first_name: { type: "string" },
        last_name: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: { user },
        statusCode: { type: "number", default: "200" },
        success: { type: "boolean" },
        message: { type: "string", default: "اطلاعات کاربر بروز شدند" },
      },
    },
  },
  handler: updateUserProfileHandler,
  preHandler: [getUserMiddleWare],
};
const getUserProfile = {
  schema: {
    tags: ["user"],
    summery: "get all user information",
    security: [{ apiKey: [] }],
    response: {
      200: {
        type: "object",
        properties: {
          user,
          statusCode: { type: "number", default: "200" },
          success: { type: "boolean" },
          message: { type: "string", default: "کاربران یافت شدند" },
        },
      },
      404: {
        type: "object",
        properties: {
          statusCode: { type: "number", default: "404" },
          success: { type: "boolean", default: false },
          message: { type: "string", default: "کاربری یافت نشد" },
        },
      },
    },
  },
  handler: getProfileUser,
  preHandler: [getUserMiddleWare],
};
const findAllUsersRoutes = {
  schema: {
    tags: ["user"],
    summery: "find all users",
    response: {
      200: {
        type: "object",
        properties: {
          users: {
            type: "array",
            items: user,
          },
          statusCode: { type: "number", default: "200" },
          success: { type: "boolean" },
          message: { type: "string", default: "کاربران یافت شدند" },
        },
      },
      404: {
        type: "object",
        properties: {
          statusCode: { type: "number", default: "404" },
          success: { type: "boolean", default: false },
          message: { type: "string", default: "کاربری یافت نشد" },
        },
      },
    },
  },
  handler: findAllUsersHandler,
};
const findAllMastersRoutes = {
  schema: {
    tags: ["user"],
    summery: "find all masters",
    response: {
      200: {
        type: "object",
        properties: {
          user,
          status: { type: "number", default: "200" },
          success: { type: "boolean" },
          message: { type: "string", default: "کاربران یافت شدند" },
        },
      },
      404: {
        type: "object",
        properties: {
          statusCode: { type: "number", default: "404" },
          success: { type: "boolean", default: false },
          message: { type: "string", default: "کاربری یافت نشد" },
        },
      },
    },
  },
  handler: findMastersHandler,
};
export default function userRoutes(fastify, options, done) {
  fastify.put("/updateProfile", updateProfileRoutes);
  fastify.get("/getUserProfile", getUserProfile);
  fastify.get("/findAll", findAllUsersRoutes);
  fastify.get("/findAllMasters", findAllMastersRoutes);
  done();
}
