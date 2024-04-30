"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Hotels, roomService }) {
      this.belongsTo(Hotels, { foreignKey: "hotelId" });
      this.hasMany(roomService, { foreignKey: "roomId" });
    }
  }
  Room.init(
    {
      name: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      quantity_people: DataTypes.INTEGER,
      type_bed: DataTypes.STRING,
      imageUrl: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
