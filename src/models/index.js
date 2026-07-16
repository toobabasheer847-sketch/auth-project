import sequelize from "../config/database.js";
import User from "./user.model.js";
import UserOtp from "./userOtp.model.js";


// Relationships

// One User -> Many OTPs
User.hasMany(UserOtp, {
  foreignKey: "userId",
  sourceKey: "id",
});


// Every OTP belongs to one User
UserOtp.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});



export {
  sequelize,
  User,
  UserOtp,
};