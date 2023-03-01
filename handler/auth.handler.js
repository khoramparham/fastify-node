import { User } from "../model/user.model";

export const signUpHandler = async (req, reply) => {
  const { email, password } = req.body;
  findEmail(email);
};
export const loginHandler = async (req, reply) => {
  const { mobile } = req.body;
};
export const getOTPHandler = async (req, reply) => {
  const { mobile } = req.body;
};
export const Handler = async (req, reply) => {
  const { mobile } = req.body;
};
async function findEmail(email) {
  const findUser = await User.findOne();
  // if(!!findEmail) throw
  return findEmail;
}
