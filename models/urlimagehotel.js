"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UrlImageHotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Hotels, { foreignKey: "HotelId" });
    }
  }
  UrlImageHotel.init(
    {
      url: DataTypes.STRING,
      file_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UrlImageHotel",
    }
  );
  return UrlImageHotel;
};
