'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UrlImageRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo((models.Hotels),{foreignKey: "IdRoom"} )
    }
  }
  UrlImageRoom.init({
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UrlImageRoom',
  });
  return UrlImageRoom;
};