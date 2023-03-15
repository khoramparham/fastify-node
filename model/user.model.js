import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";
export class User extends Model {}
User.init(
  {
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
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING },
    access_token: { type: DataTypes.STRING },
    universityID: { type: DataTypes.STRING },
    collageMajorID: { type: DataTypes.STRING },
  },
  {
    sequelize,
    name: "users",
  }
);
User.sync({ force: true });
