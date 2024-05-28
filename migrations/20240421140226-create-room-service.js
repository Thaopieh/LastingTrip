"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roomServices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      roomId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Rooms",
          key: "id",
          onDelete: "CASCADE",
        },
      },
      serviceId: {
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
    await queryInterface.dropTable("roomServices");
  },
};
