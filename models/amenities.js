"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Amenities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ HotelAmenities }) {
      this.hasMany(HotelAmenities, { foreignKey: "amenityId" });
    }
  }
  Amenities.init(
    {
      name: DataTypes.STRING,
      class: DataTypes.STRING,
      type: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Amenities",
    }
  );
  return Amenities;
};
