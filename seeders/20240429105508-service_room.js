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
    await queryInterface.bulkInsert("roomservices", [
      {
        "roomId": 1,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 1,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 1,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 2,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 2,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 2,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 3,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 3,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 4,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 4,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 5,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 5,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 5,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 6,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 6,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 6,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 7,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 7,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 7,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 8,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 8,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 9,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 9,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 9,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 10,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 10,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 10,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 11,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 11,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 11,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 12,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 12,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 12,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 13,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 13,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 13,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 14,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 14,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 15,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 15,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 16,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 16,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 17,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 17,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 18,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 18,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 19,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 19,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 19,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 20,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 20,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 21,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 21,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 22,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 22,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 22,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 23,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 23,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 23,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 24,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 24,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 24,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 25,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 25,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 25,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 26,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 26,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 27,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 27,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 28,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 28,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 28,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 29,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 29,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 29,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 30,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 30,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 30,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 31,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 31,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 32,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 32,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 32,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 33,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 33,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 34,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 34,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 34,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 35,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 35,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 36,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 36,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 37,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 37,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 38,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 38,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 38,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 39,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 39,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 39,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 40,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 40,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 40,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 41,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 41,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 41,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 42,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 42,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 42,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 43,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 43,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 44,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 44,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 44,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 45,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 45,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 46,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 46,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 46,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 47,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 47,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 47,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 48,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 48,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 48,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 49,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 49,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 49,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 50,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 50,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 51,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 51,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 52,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 52,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 53,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 53,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 54,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 54,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 55,
        "serviceId": 22,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 55,
        "serviceId": 20,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 55,
        "serviceId": 19,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 56,
        "serviceId": 18,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 56,
        "serviceId": 21,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      },
      {
        "roomId": 56,
        "serviceId": 23,
        "createdAt": "2024-04-01 04:26:18",
        "updatedAt": "2024-04-01 04:26:18"
      }
    ]);
  },


  async down(queryInterface, Sequelize) {
    // Xóa tất cả dữ liệu từ bảng Rooms
    await queryInterface.bulkDelete("roomservices", null, {});
  },
};
