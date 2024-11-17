'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Filters', [
      { id: 1, name: 'Khách sạn', category: 'accommodation_type', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Homestay', category: 'accommodation_type', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Resort', category: 'accommodation_type', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Căn hộ dịch vụ', category: 'accommodation_type', createdAt: new Date(), updatedAt: new Date() },

      { id: 5, name: '1 giường đơn', category: 'bed_type', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: '1 giường đôi', category: 'bed_type', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, name: '2 giường đơn', category: 'bed_type', createdAt: new Date(), updatedAt: new Date() },
      { id: 8, name: '3 giường đơn', category: 'bed_type', createdAt: new Date(), updatedAt: new Date() },
      { id: 9, name: 'Giường King', category: 'bed_type', createdAt: new Date(), updatedAt: new Date() },

      { id: 10, name: 'Bãi đậu xe riêng', category: 'amenities', createdAt: new Date(), updatedAt: new Date() },
      { id: 11, name: 'Bể bơi ngoài trời', category: 'amenities', createdAt: new Date(), updatedAt: new Date() },
      { id: 12, name: 'Internet', category: 'amenities', createdAt: new Date(), updatedAt: new Date() },
      { id: 13, name: 'Khu vực hút thuốc', category: 'amenities', createdAt: new Date(), updatedAt: new Date() },
      { id: 14, name: 'Bar', category: 'amenities', createdAt: new Date(), updatedAt: new Date() },
      { id: 15, name: 'Khu vực tắm nắng', category: 'amenities', createdAt: new Date(), updatedAt: new Date() },
      { id: 16, name: 'View thành phố', category: 'amenities', createdAt: new Date(), updatedAt: new Date() },
      { id: 17, name: 'Phòng spa', category: 'amenities', createdAt: new Date(), updatedAt: new Date() },
      { id: 18, name: 'Đưa đón sân bay', category: 'amenities', createdAt: new Date(), updatedAt: new Date() },

      { id: 19, name: 'Thanh toán online', category: 'payment_method', createdAt: new Date(), updatedAt: new Date() },
      { id: 20, name: 'Thanh toán tại khách sạn', category: 'payment_method', createdAt: new Date(), updatedAt: new Date() },

      { id: 21, name: 'Phòng gia đình', category: 'room_type', createdAt: new Date(), updatedAt: new Date() },
      { id: 22, name: 'Phòng Suite', category: 'room_type', createdAt: new Date(), updatedAt: new Date() },
      { id: 23, name: 'Phòng view biển', category: 'room_type', createdAt: new Date(), updatedAt: new Date() },
      { id: 24, name: 'Phòng có máy chiếu', category: 'room_type', createdAt: new Date(), updatedAt: new Date() },
      { id: 25, name: 'Phòng view núi', category: 'room_type', createdAt: new Date(), updatedAt: new Date() },

      { id: 26, name: 'Điều hòa', category: 'room_amenity', createdAt: new Date(), updatedAt: new Date() },
      { id: 27, name: 'Máy giặt', category: 'room_amenity', createdAt: new Date(), updatedAt: new Date() },
      { id: 28, name: 'TV', category: 'room_amenity', createdAt: new Date(), updatedAt: new Date() },
      { id: 29, name: 'Bồn tắm', category: 'room_amenity', createdAt: new Date(), updatedAt: new Date() },
      { id: 30, name: 'Tủ lạnh', category: 'room_amenity', createdAt: new Date(), updatedAt: new Date() },
      { id: 31, name: 'Ban công', category: 'room_amenity', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Filters', null, {});
  }
};
