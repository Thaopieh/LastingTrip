"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Reviews, Hotels }) {
      // define association here
      this.hasMany(Reviews, { foreignKey: "guestId", onDelete: "CASCADE" });
      this.hasOne(Hotels, { foreignKey: "ownerId", onDelete: "CASCADE" });
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
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeDestroy: async (instance) => {
          const guestId = instance.id;
          const review = sequelize.models.Reviews;
          await review.destroy({ where: { guestId: guestId } });

          const hotel = sequelize.models.Hotels;
          await hotel.destroy({ where: { ownerId: guestId } });
        },
      },
    }
  );
  return User;
};
