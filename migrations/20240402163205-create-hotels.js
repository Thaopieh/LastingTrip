"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Hotels", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      rate: {
        type: Sequelize.INTEGER,
      },
      userRating: {
        type: Sequelize.FLOAT,
      },
      map: {
        type: Sequelize.STRING,
      },
      linkMap: {
        type: Sequelize.STRING,
      },
      roomType: {
        type: Sequelize.STRING,
      },
      TypeHotel:{
        type: Sequelize.STRING,
      } ,
      status: {
        type: Sequelize.STRING,
      },
      cost: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.INTEGER,
      },
      embedMap: {
        type: Sequelize.TEXT,
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      payment: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable("Hotels");
  },
};
