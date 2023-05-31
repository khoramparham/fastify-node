import { User } from "../model/user.model.js";

export const updateUserProfileHandler = async (req, reply) => {
  const userID = req.user.id;
  const { password, first_name, last_name, phone } = req.body;
  const user = await User.findOne({
    where: { id: userID },
  });
  if (!user) {
    reply.status(404).send({
      statusCode: 404,
      success: false,
      message: "کاربر یافت نشد",
    });
  }
  const userUpdated = await User.update(
    {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      phone: phone,
    },
    {
      where: { id: userID },
    }
  );
  console.log(userUpdated);
  return reply.status(200).send({
    userUpdated,
    statusCode: "200",
    success: true,
    message: "اطلاعات کاربر بروز شدند",
  });
};
export const findAllUsersHandler = async (req, reply) => {
  const users = await User.findAll();
  users.forEach((Users, index, array) => {
    array[index] = Users.dataValues;
  });
  return reply.status(200).send({
    users,
    statusCode: "200",
    success: true,
    message: "کاربران یافت شدند",
  });
};
export const getProfileUser = async (req, reply) => {
  const user = req.user;
  return reply.status(200).send({
    user,
    statusCode: 200,
    success: true,
    message: "کاربر یافت شد",
  });
};
export const findMastersHandler = async (req, reply) => {
  const masters = await User.findAll({ where: { role: { eq: "master" } } });
  if (!masters) reply.status(400).send(new Error("استادی یافت نشد"));
  return reply.status(200).send({
    masters,
    statusCode: "200",
    success: true,
    message: "اساتید یافت شدند",
  });
};
