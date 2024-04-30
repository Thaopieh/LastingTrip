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
    // name: DataTypes.STRING,
    // email: DataTypes.STRING,
    // password: DataTypes.STRING,
    // numberPhone: DataTypes.STRING,
    // type: DataTypes.STRING,
    await queryInterface.bulkInsert("users", [
      {
        name: "Trinh Thao",
        email: "thieukhanhvu11204@gmail.com",
        password: "thao@112",
        numberPhone: "46664324",
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Trinh Thu",
        email: "thieukhanhvu11104@gmail.com",
        password: "thao@112",
        numberPhone: "46664324",
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
