"use strict";

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
     *
     */
    await queryInterface.bulkInsert("reviews", [
      {
        rating: 5,
        description: "Qua tuyet voi",
        guestId: 1,
        hotelId: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        rating: 4,
        description: "Tam on",
        guestId: 1,
        hotelId: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        rating: 5,
        description: "Tren ca tuyet voi",

        guestId: 2,
        hotelId: 2,

        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        rating: 5,
        description: "Qua tuyet voi",

        guestId: 2,
        hotelId: 2,

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
    await queryInterface.bulkDelete("reviews", null, {});
  },
};
