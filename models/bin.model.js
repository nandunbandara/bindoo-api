(() => {
  "use strict";

  const { Model, DataTypes } = require("sequelize");
  const sequelize = require("../middleware/database").getConnection();

  const Location = require("./location.model");

  class Bin extends Model {}

  Bin.init(
    {
      name: DataTypes.STRING, // name of the bin
      description: DataTypes.TEXT,
      type: DataTypes.INTEGER,
      capacity: DataTypes.FLOAT
    },
    { sequelize, modelName: "bin" }
  );

  Bin.associate = models => {
    Bin.belongsTo(models.bin, { foreignKey: "id" });
  };

  module.exports = Bin;
})();
