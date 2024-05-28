"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HotelAmenities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Hotels, { foreignKey: "hotelId" });
      this.belongsTo(models.Amenities, { foreignKey: "amenityId" });
    }
  }
  HotelAmenities.init(
    {
      hotelId: DataTypes.INTEGER,
      amenityId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "HotelAmenities",
    }
  );
  return HotelAmenities;
};
