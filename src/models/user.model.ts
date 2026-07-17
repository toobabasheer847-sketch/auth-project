import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.js";

export interface UserAttributes {
  id: string;
  email: string;
  phone: string;
  password: string;
  verifiedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "verifiedAt" | "createdAt" | "updatedAt"
>;

export interface UserModel
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const User = sequelize.define<UserModel, UserAttributes>(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);


export default User;