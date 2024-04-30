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
     */

    await queryInterface.bulkInsert(
      "stations",
      [
        {
          name: "Ben xe mien tay",
          adress: "dau cung duoc",
          province: "HCM",
          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Ben xe mien dong",
          adress: "dau cung duoc",
          province: "HCM",
          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Ben xe mien trung",
          adress: "dau cung duoc",
          province: "HCM",
          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("stations", null, {});
  },
};
