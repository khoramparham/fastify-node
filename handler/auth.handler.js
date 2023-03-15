import { fastify } from "./../server.js";
import { User } from "../model/user.model.js";

export const signInHandler = async (req, reply) => {
  const { email, password, first_name, last_name } = req.body;
  const user = await findUser(email);
  if (user) reply.status(400).send(new Error("ایمیل قبلا استفاده شده است"));
  const newUser = await new User({
    first_name,
    last_name,
    email,
    password: await fastify.bcrypt.hash(password),
  }).save();
  reply.status(200).send({ newUser, message: "کاربر با موفقیت ثبت شد" });
};
export const logInHandler = async (req, reply) => {
  const { email, password } = req.body;
  const user = await findUser(email);
  if (!user) reply.status(404).send(new Error("ایمیل وجود ندارد"));
  const compareResult = await fastify.bcrypt.compare(password, user.password);
  if (!compareResult) {
    reply.status(401).send(new Error("ورود نا موفقیت شد"));
  }
  user.access_token = fastify.jwt.sign({ email }, { expiresIn: "1y" });
  await user.save();
  reply.status(201).send({
    message: "ورود موفقیت امیز بود",
    access_token: user.access_token,
    user,
  });
};
export const forgotPassword = async (req, reply) => {
  const email = req.body;
  const user = await findUser(email);
  if (!user) reply.status(404).send(new Error("کاربری با این ایمیل وجود ندارد"));
  reply.status(200).send({});
};
export const getOTPHandler = async (req, reply) => {
  const { mobile } = req.body;
};
export const checkOTPHandler = async (req, reply) => {
  const { mobile } = req.body;
};
async function findUser(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}
