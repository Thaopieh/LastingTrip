"use strict";
const { Model, where } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Hotels, roomService, UrlImageRoom, Booking }) {
      this.belongsTo(Hotels, { foreignKey: "hotelId" });
      this.hasMany(roomService, { foreignKey: "roomId", onDelete: "CASCADE" });
      this.hasMany(UrlImageRoom, { foreignKey: "IdRoom", onDelete: "CASCADE" });
      this.hasMany(Booking, { foreignKey: "room_id", onDelete: "CASCADE" });
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
    },
    {
      sequelize,
      modelName: "Room",
      hooks: {
        beforeDestroy: async (instance) => {
          const roomId = instance.id;
          const UrlImageRoom = sequelize.models.UrlImageRoom;

          // Xóa tất cả các bản ghi trong bảng UrlImageHotel có HotelId tương ứng
          if (UrlImageRoom) {
            await UrlImageRoom.destroy({ where: { IdRoom: roomId } });
          }

          const roomService = sequelize.models.roomService;
          if (roomService) {
            await roomService.destroy({ where: { roomId: roomId } });
          }

          const booking = sequelize.models.Booking;
          if (booking) {
            await booking.destroy({ where: { room_id: roomId } });
          }
        },
      },
    }
  );
  return Room;
};
