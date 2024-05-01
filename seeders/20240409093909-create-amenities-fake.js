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

    await queryInterface.bulkInsert("amenities", [
      {
        name: "Khu vực tắm nắng ",
        class: "fa-solid fa-umbrella",
        type: 0,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Spa",
        class: "fa-solid fa-spa",
        type: 0,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Bãi đậu xe riêng",
        class: "fa-solid fa-car",
        type: 0,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Đưa đón sân bay",
        class: "fa-solid fa-plane",
        type: 0,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Wifi công cộng",
        class: "fa-solid fa-wifi",
        type: 0,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Bể bơi ngoài trời ",
        class: "fa-solid fa-water-ladder",
        type: 0,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Khu vực ăn uống",
        class: "fa-solid fa-kitchen-set",
        type: 0,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Bar",
        class: "fa-solid fa-wine-bottle",
        type: 0,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Cafes",
        class: "fa-solid fa-mug-saucer",
        type: 0,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Giữ hành lý",
        class: "save",
        type: 0,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Báo thức",
        class: "ring_volume",
        type: 0,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Phòng họp",
        class: "groups",
        type: 0,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "View thành phố",
        class: "location_city",
        type: 0,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Không hút thuốc",
        class: "smoke_free",
        type: 0,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Phòng tắm riêng tư",
        class: "shower",
        type: 0,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Máy lạnh",
        class: "heat_pump",
        type: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Lễ tân 24/7",
        class: " timer ",
        type: 0,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Điều hòa",
        class: "ac_unit",
        type: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Máy giặt",
        class: "local_laundry_service",
        type: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Ti Vi",
        class: "tv",
        type: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Bồn tắm",
        class: "bathtub",
        type: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Tủ lạnh",
        class: "kitchen",
        type: 1,
        createdAt: "2024-04-01 04:26:18",
        updatedAt: "2024-04-01 04:26:18",
      },
      {
        name: "Ban công",
        class: "balcony",
        type: 1,
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
     *
     */
    await queryInterface.bulkDelete("amenities", null, {});
  },
};
