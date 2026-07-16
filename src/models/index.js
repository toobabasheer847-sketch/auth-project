import sequelize from "../config/database.js";
import User from "./user.model.js";
import UserOtp from "./userOtp.model.js";


// Relationships


// One User -> Many OTPs
User.hasMany(UserOtp, {
  foreignKey: "userEmail",
  sourceKey: "email",
});

// Every OTP belongs to one User
UserOtp.belongsTo(User, {
  foreignKey: "userEmail",
  targetKey: "email",
});

const db = {
  sequelize,
  User,
  UserOtp,
};

export default db;






