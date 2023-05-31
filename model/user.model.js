import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";
export const User = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  role: { type: DataTypes.STRING },
  access_token: { type: DataTypes.STRING, defaultValue: "" },
  university: { type: DataTypes.STRING },
  collageMajor: { type: DataTypes.STRING },
});
sequelize
  .sync()
  .then(() => {
    // console.log("User table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
