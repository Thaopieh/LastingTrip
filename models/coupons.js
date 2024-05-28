'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coupons.init({
    code: DataTypes.STRING,
    percent: DataTypes.INTEGER,
    begin: DataTypes.DATE,
    end: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Coupons',
  });
  return Coupons;
};