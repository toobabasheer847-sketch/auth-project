import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.js";

export interface UserOtpAttributes {
  id: string;
  userId: string;
  otp: string;
  used: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserOtpCreationAttributes = Optional<
  UserOtpAttributes,
  "id" | "used" | "createdAt" | "updatedAt"
>;

export interface UserOtpModel
  extends Model<UserOtpAttributes, UserOtpCreationAttributes>,
    UserOtpAttributes {}

const UserOtp = sequelize.define<UserOtpModel, UserOtpAttributes>(
  "UserOtp",
  {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },


    userId: {
      type: DataTypes.UUID,
      allowNull: false,

      references: {
        model: "users",
        key: "id",
      },

      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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

  }
);


export default UserOtp;