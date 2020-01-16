(() => {
  "use strict";

  const { Model, DataTypes } = require("sequelize");
  const sequelize = require("../middleware/database").getConnection();

  const Location = require("./location.model");

  class User extends Model {}

  User.init(
    {
      uid: { type: DataTypes.STRING, primaryKey: true, unique: true },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      userType: DataTypes.INTEGER,
      nic: { type: DataTypes.STRING, unique: true },
      email: { type: DataTypes.STRING, unique: true },
      mobile: DataTypes.STRING,
      isActive: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    { sequelize, modelName: "user" }
  );

  User.hasMany(Location);

  module.exports = User;
})();
