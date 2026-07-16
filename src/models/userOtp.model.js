import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserOtp = sequelize.define(
  "UserOtp",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "user_otps",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: false,
  }
);

export default UserOtp;