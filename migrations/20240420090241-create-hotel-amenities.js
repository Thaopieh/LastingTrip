"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("HotelAmenities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hotelId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Hotels",
          key: "id",
          onDelete: "CASCADE",
        },
      },
      amenityId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Amenities",
          key: "id",
          onDelete: "CASCADE",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("HotelAmenities");
  },
};
