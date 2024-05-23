'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("coupons", [
      {
        code: 'WELCOME5',
        percent: 5,
        begin: new Date('2024-05-01'),
        end: new Date('2024-05-31')
      },
      {
        code: 'SUMMER10',
        percent: 10,
        begin: new Date('2024-06-01'),
        end: new Date('2024-06-30')
      },
      {
        code: 'BACK2SCHOOL8',
        percent: 8,
        begin: new Date('2024-08-01'),
        end: new Date('2024-08-31')
      },
      {
        code: 'HOLIDAY15',
        percent: 15,
        begin: new Date('2024-12-01'),
        end: new Date('2024-12-31')
      },
      {
        code: 'NEWYEAR12',
        percent: 12,
        begin: new Date('2025-01-01'),
        end: new Date('2025-01-31')
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
