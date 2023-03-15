import { Sequelize } from "sequelize";
// postgres
export const sequelize = new Sequelize("fastify", "postgres", "root", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false,
});
// export const sequelize = new Sequelize(
//   process.env.POSTGRES_NAME,
//   process.env.POSTGRES_USER,
//   process.env.POSTGRES_PASSWORD,
//   {
//     host: "localhost",
//     port: process.env.POSTGRES_PORT,
//     dialect: "postgres",
//     logging: false,
//   }
// );
const DBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("postgres connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
DBConnection();
