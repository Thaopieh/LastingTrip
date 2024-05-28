"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class roomService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Room, { foreignKey: "roomId" });
      this.belongsTo(models.Amenities, { foreignKey: "serviceId" });
    }
  }
  roomService.init(
    {
      roomId: DataTypes.INTEGER,
      serviceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "roomService",
    }
  );
  return roomService;
};
