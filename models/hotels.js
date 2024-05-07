"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hotels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Room, Reviews, HotelAmenities, UrlImageHotel}) {
      this.hasMany(Room, { foreignKey: "hotelId" });
      this.hasMany(Reviews, { foreignKey: "hotelId" });
      this.hasMany(HotelAmenities, { foreignKey: "hotelID" });
      this.hasMany(UrlImageHotel, {foreignKey: "HotelId"})
    }
  }
  Hotels.init(
    {
      name: DataTypes.STRING,
      rate: DataTypes.INTEGER,
      userRating: DataTypes.FLOAT,
      map: DataTypes.STRING,
      roomType: DataTypes.STRING,
      TypeHotel: DataTypes.STRING,
      payment: DataTypes.STRING,
      status: DataTypes.STRING,
      cost: DataTypes.INTEGER,
      type: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Hotels",
    }
  );
  return Hotels;
};
