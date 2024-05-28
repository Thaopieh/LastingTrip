"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Hotels, User }) {
      // define association here
      this.belongsTo(Hotels, { foreignKey: "hotelId", onDelete: "CASCADE" });
      this.belongsTo(User, { foreignKey: "guestId", onDelete: "CASCADE" });
    }
  }
  Reviews.init(
    {
      rating: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      file: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Reviews",
    }
  );
  return Reviews;
};
