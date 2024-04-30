"use strict";

const amenities = require("../models/amenities");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("hotelamenities", [
      {
        hotelId: 1,
        amenityId: 5,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 1,
        amenityId: 6,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 1,
        amenityId: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 1,
        amenityId: 2,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 1,
        amenityId: 8,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 1,
        amenityId: 9,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 2,
        amenityId: 9,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 2,
        amenityId: 6,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 2,
        amenityId: 8,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 2,
        amenityId: 3,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 2,
        amenityId: 2,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 2,
        amenityId: 5,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 3,
        amenityId: 2,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 3,
        amenityId: 8,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 3,
        amenityId: 6,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 3,
        amenityId: 5,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 3,
        amenityId: 9,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 3,
        amenityId: 3,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 4,
        amenityId: 2,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 4,
        amenityId: 5,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 4,
        amenityId: 9,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 4,
        amenityId: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 4,
        amenityId: 3,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 4,
        amenityId: 8,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 5,
        amenityId: 8,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 5,
        amenityId: 6,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 5,
        amenityId: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 5,
        amenityId: 3,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 5,
        amenityId: 5,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 5,
        amenityId: 2,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 6,
        amenityId: 6,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 6,
        amenityId: 5,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 6,
        amenityId: 2,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 6,
        amenityId: 3,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 6,
        amenityId: 7,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 6,
        amenityId: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 7,
        amenityId: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 7,
        amenityId: 5,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 7,
        amenityId: 4,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 7,
        amenityId: 2,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 7,
        amenityId: 9,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 7,
        amenityId: 7,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 8,
        amenityId: 8,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 8,
        amenityId: 9,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 8,
        amenityId: 4,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 8,
        amenityId: 5,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 8,
        amenityId: 7,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 8,
        amenityId: 2,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 9,
        amenityId: 3,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 9,
        amenityId: 6,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 9,
        amenityId: 2,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 9,
        amenityId: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 9,
        amenityId: 9,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 9,
        amenityId: 5,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 10,
        amenityId: 4,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 10,
        amenityId: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 10,
        amenityId: 8,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 10,
        amenityId: 3,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 10,
        amenityId: 2,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 10,
        amenityId: 7,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 11,
        amenityId: 5,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 11,
        amenityId: 6,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 11,
        amenityId: 7,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 11,
        amenityId: 4,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 11,
        amenityId: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 11,
        amenityId: 9,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 12,
        amenityId: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 12,
        amenityId: 6,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 12,
        amenityId: 2,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 12,
        amenityId: 4,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 12,
        amenityId: 3,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 12,
        amenityId: 9,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 13,
        amenityId: 4,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 13,
        amenityId: 5,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 13,
        amenityId: 2,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 13,
        amenityId: 7,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 13,
        amenityId: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 13,
        amenityId: 9,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 14,
        amenityId: 3,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 14,
        amenityId: 5,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 14,
        amenityId: 2,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 14,
        amenityId: 8,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 14,
        amenityId: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 14,
        amenityId: 7,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 15,
        amenityId: 4,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 15,
        amenityId: 3,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 15,
        amenityId: 7,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 15,
        amenityId: 5,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 15,
        amenityId: 6,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 15,
        amenityId: 9,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 16,
        amenityId: 3,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 16,
        amenityId: 4,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 16,
        amenityId: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 16,
        amenityId: 5,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 16,
        amenityId: 8,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 16,
        amenityId: 2,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 17,
        amenityId: 6,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 17,
        amenityId: 3,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 17,
        amenityId: 9,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 17,
        amenityId: 7,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 17,
        amenityId: 5,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 17,
        amenityId: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 18,
        amenityId: 9,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 18,
        amenityId: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 18,
        amenityId: 4,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 18,
        amenityId: 2,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 18,
        amenityId: 5,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        hotelId: 18,
        amenityId: 3,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("hotelamenities", null, {});
  },
};
