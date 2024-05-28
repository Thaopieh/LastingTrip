"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "bookings",
      [
        {
          room_id: 1,
          user_id: 1,
          hotel_id: 1,
          check_in_date: "1936-09-12 00:00:00",
          check_out_date: "1936-09-12 00:00:00",
          total_price: 10000,
          status: 1,
          special_requests: "Don",
          full_name: "Antonio Goodwin",
          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          room_id: 4,
          user_id: 3,
          hotel_id: 1,
          check_in_date: "1936-09-12 00:00:00",
          check_out_date: "1936-09-12 00:00:00",
          total_price: 10000,
          status: 1,
          special_requests: "Do hagern",
          full_name: "Antonio GoMfdgewin",
          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },

      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("bookings", null, {});
  },
};
