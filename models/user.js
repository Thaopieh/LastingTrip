"use strict";
const { Model } = require("sequelize");
const { Op, literal } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Reviews, Hotels, Booking }) {
      // define association here
      this.hasMany(Reviews, { foreignKey: "guestId", onDelete: "CASCADE" });
      this.hasOne(Hotels, { foreignKey: "ownerId", onDelete: "CASCADE" });
      this.hasMany(Booking, { foreignKey: "user_id", onDelete: "CASCADE" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      numberPhone: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      gender: DataTypes.BOOLEAN,
      type: DataTypes.STRING,
      cccd: DataTypes.STRING,
      address: DataTypes.TEXT,
      url: DataTypes.STRING,
      authGgId: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      authType: {
        type: DataTypes.ENUM('local', 'google', 'facebook'),
        defaultValue: 'local'
      }
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeDestroy: async (instance) => {
          const guestId = instance.id;
          console.log(`Deleting user with id: ${guestId}`);

          const review = sequelize.models.Reviews;
          await review.destroy({ where: { guestId: guestId } });
          console.log(`Deleted reviews for user id: ${guestId}`);

          const hotelService = sequelize.models.HotelAmenities;
          await hotelService.destroy({
            where: {
              hotelId: {
                [Op.in]: sequelize.literal(
                  `(SELECT id FROM Hotels WHERE ownerId = ${guestId} )`
                ),
              },
            },
          });

          const reviewHotel = sequelize.models.Reviews;
          await reviewHotel.destroy({
            where: {
              hotelId: {
                [Op.in]: sequelize.literal(
                  `(SELECT id FROM Hotels WHERE ownerId = ${guestId} )`
                ),
              },
            },
          });

          const UrlImageHotel = sequelize.models.UrlImageHotel;
          await UrlImageHotel.destroy({
            where: {
              hotelId: {
                [Op.in]: sequelize.literal(
                  `(SELECT id FROM Hotels WHERE ownerId = ${guestId} )`
                ),
              },
            },
          });

          const roomService = sequelize.models.roomService;
          await roomService.destroy({
            where: {
              roomId: {
                [Op.in]: sequelize.literal(
                  `(SELECT Rooms.id FROM Rooms 
                    JOIN Hotels ON Rooms.hotelId = Hotels.id 
                    WHERE Hotels.id = ${guestId})`
                ),
              },
            },
          });
          console.log(`Deleted roomservice for user id: ${guestId}`);

          const imgRoom = sequelize.models.UrlImageRoom;
          await imgRoom.destroy({
            where: {
              IdRoom: {
                [Op.in]: sequelize.literal(
                  `(SELECT Rooms.id FROM Rooms 
                    JOIN Hotels ON Rooms.hotelId = Hotels.id 
                    WHERE Hotels.id = ${guestId})`
                ),
              },
            },
          });

          console.log(`Deleted room image for user id: ${guestId}`);

          const room = sequelize.models.Room;
          await room.destroy({
            where: {
              hotelId: {
                [Op.in]: sequelize.literal(
                  `(SELECT id FROM Hotels WHERE ownerId = ${guestId} )`
                ),
              },
            },
          });

          console.log(`Deleted rooms for user id: ${guestId}`);

          const hotel = sequelize.models.Hotels;
          await hotel.destroy({ where: { ownerId: guestId } });
          console.log(`Deleted hotels for user id: ${guestId}`);

          const booking = sequelize.models.Booking;
          await booking.destroy({ where: { user_id: guestId } });
          console.log(`Deleted bookings for user id: ${guestId}`);
        },
      },
    }
  );
  return User;
};
