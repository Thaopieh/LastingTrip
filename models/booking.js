'use strict';
const { model } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Room, { foreignKey: "room_id" });
      this.belongsTo(models.User, { foreignKey: "user_id" });
      this.belongsTo(models.Hotels, { foreignKey: "hotel_id" });
    }
  }
  Booking.init({
    room_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    hotel_id: DataTypes.INTEGER,
    check_in_date: DataTypes.DATE,
    check_out_date: DataTypes.DATE,
    total_price: DataTypes.DECIMAL,
    status: DataTypes.BOOLEAN,
    special_requests: DataTypes.TEXT,
    full_name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    hotel_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};