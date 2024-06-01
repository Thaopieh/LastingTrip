"use strict";
const { Model } = require("sequelize");
const { Op, literal } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Hotels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Room, Reviews, HotelAmenities, UrlImageHotel, User }) {
      this.hasMany(Room, { foreignKey: "hotelId", onDelete: "CASCADE" });
      this.hasMany(Reviews, { foreignKey: "hotelId", onDelete: "CASCADE" });
      this.hasMany(HotelAmenities, {
        foreignKey: "hotelId",
        onDelete: "CASCADE",
      });
      this.hasMany(UrlImageHotel, {
        foreignKey: "HotelId",
        onDelete: "CASCADE",
      });
      this.belongsTo(User, { foreignKey: "ownerId", onDelete: "CASCADE" });
    }
  }

  Hotels.init(
    {
      name: DataTypes.STRING,
      star: DataTypes.INTEGER, // star
      userRating: DataTypes.FLOAT,
      map: DataTypes.STRING,
      TypeHotel: DataTypes.STRING, // hotel, resort ...
      payment: DataTypes.STRING, // ? can thiet k?
      cost: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Hotels",
      hooks: {
        beforeDestroy: async (instance) => {
          const hotelId = instance.id;
          const roomService = sequelize.models.roomService;
          await roomService.destroy({
            where: {
              roomId: {
                [Op.in]: literal(
                  `(SELECT id FROM Rooms WHERE hotelId = ${hotelId})`
                ),
              },
            },
          });
          const imgRoom = sequelize.models.UrlImageRoom;
          await imgRoom.destroy({
            where: {
              IdRoom: {
                [Op.in]: literal(
                  `(SELECT id FROM Rooms WHERE hotelId = ${hotelId})`
                ),
              },
            },
          });

          const Room = sequelize.models.Room;
          await Room.destroy({ where: { hotelId: hotelId } });

          const UrlImageHotel = sequelize.models.UrlImageHotel;
          await UrlImageHotel.destroy({ where: { HotelId: hotelId } });

          const review = sequelize.models.Reviews;
          await review.destroy({ where: { hotelId: hotelId } });

          const amenities = sequelize.models.HotelAmenities;
          await amenities.destroy({ where: { hotelId: hotelId } });
        },

        afterFind: async (hotels) => {
          if (Array.isArray(hotels)) {
            for (const hotel of hotels) {
              await hotel.updateAverageUserRating();
              await hotel.updateMinPriceHotel();
            }
          } else if (hotels) {
            await hotels.updateAverageUserRating();
            await hotels.updateMinPriceHotel();
          }
        },
        afterCreate: async (hotel) => {
          await hotel.updateAverageUserRating();
          await hotel.updateMinPriceHotel();
        },
      },
    }
  );

  Hotels.prototype.updateAverageUserRating = async function () {
    const hotelId = this.id;

    const [result] = await sequelize.query(`
      UPDATE Hotels AS h
      SET userRating = (
        SELECT ROUND(AVG(r.rating), 1)
        FROM Reviews AS r
        WHERE r.hotelId = ${hotelId}
        HAVING COUNT(r.rating) > 0
      )
      WHERE h.id = ${hotelId} AND EXISTS (
        SELECT 1
        FROM Reviews AS r
        WHERE r.hotelId = ${hotelId}
      )
    `);

    return result;
  };

  Hotels.prototype.updateMinPriceHotel = async function () {
    const hotelId = this.id;

    const [result] = await sequelize.query(`
      UPDATE Hotels AS h
      SET cost = (
        SELECT MIN(price)
        FROM Rooms AS r
        WHERE r.hotelId = ${hotelId}
        HAVING COUNT(r.price) > 0
      )
      WHERE h.id = ${hotelId} AND EXISTS (
        SELECT 1
        FROM Rooms AS r
        WHERE r.hotelId = ${hotelId}
      )
    `);

    return result;
  };

  return Hotels;
};
