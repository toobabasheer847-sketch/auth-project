import sequelize from "../../config/database.js";

import User from "./user.model.js";
import UserOtp from "./userOtp.model.js";


// ===============================
// Associations
// ===============================


// One User has many OTPs
User.hasMany(UserOtp, {
  foreignKey: "userId",
  sourceKey: "id",
  as: "otps",
});


// One OTP belongs to one User
UserOtp.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
  as: "user",
});


// ===============================
// Export Models
// ===============================

export {
  sequelize,
  User,
  UserOtp,
};