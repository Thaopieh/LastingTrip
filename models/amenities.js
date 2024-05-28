"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Amenities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ HotelAmenities, roomService }) {
      this.hasMany(HotelAmenities, {
        foreignKey: "amenityId",
        onDelete: "CASCADE",
      });
      this.hasMany(roomService, {
        foreignKey: "serviceId",
        onDelete: "CASCADE",
      });
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
      hooks: {
        beforeDestroy: async (instance) => {
          const amenityId = instance.id;
          const HotelAmenities = sequelize.models.HotelAmenities;

          // Xóa tất cả các bản ghi trong bảng UrlImageHotel có HotelId tương ứng
          await HotelAmenities.destroy({ where: { amenityId: amenityId } });

          const service = sequelize.models.roomService;
          await service.destroy({ where: { serviceId: amenityId } });
        },
      },
    }
  );
  return Amenities;
};
