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
      "hotels",
      [
        {
          name: "Cozrum Homes - Sonata Residence",
          rate: 4,
          // rating: 5,
          // comment: "Tốt, Nhiều tiện ích, đi lại dễ dàng",
          map: "Đường Nguyễn Thị Thập, Phường Tân Phú, Quận 7, TP.HCM | Cách trung tâm thành phố 5.2 km",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Deluxe",
          TypeHotel : "Hotel",
          payment: "online",
          status: "Cập nhật lần cuối 3 phút trước",
          cost: 1015000,
          type: 1,
          embedMap:
            "9640979073!2d106.7286134!3d10.7372505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752550de162bdf%3A0xa3443bdecbb3c467!2sCozrum%20Homes%20-%20Sonata%20Residence!5e0!3m2!1sen!2s!4v1712634068896",
          // amenities: JSON.stringify("[1,2,3, 4,6,7,8,10,13]"),

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Holiday Inn & Suites Saigon Airport",
          rate: 5,
          // rating: 5,
          // comment: "Tốt, Nhiều tiện ích, đi lại dễ dàng",
          map: "Đường Cộng Hòa, Quận Tân Bình, TP.HCM | Cách trung tâm thành phố 4.7 km",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Premier",
          TypeHotel : "Hotel",
          payment: "online",
          status: "Cập nhật lần cuối 15 phút trước",
          cost: 2324235,
          type: 1,
          embedMap:
            "1261738771113!2d106.655147!3d10.801647200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712634011079",
          // amenities: JSON.stringify("[1,4,5,9,8,10,13]"),
          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "LA VELA SAIGON HOTEL ",
          rate: 5,
          // rating: 5,
          // comment: "Tốt, Nhiều tiện ích, đi lại dễ dàng",
          map: "Đường Nam Kỳ Khởi Nghĩa, Quận 3, TP.HCM | Cách trung tâm thành phố 1.8 km",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Suite",
          payment: "online",
          TypeHotel : "Hotel",
          status: "Cập nhật lần cuối 9 phút trước",
          cost: 3324235,
          type: 2,
          embedMap:
            "2954199463566!2d106.68547079999996!3d10.788670799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f2d1f5cd9e7%3A0xd2284b6940329fcf!2sLa%20Vela%20Saigon%20Hotel!5e0!3m2!1sen!2s!4v1712633936793",
          // amenities: JSON.stringify("[1,2,3, 4,9,7,8,5,12]"),
          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Sakura Hostel Saigon",
          rate: 4,
          // rating: 4,
          // comment: "Tốt, Nhiều tiện ích, đi lại dễ dàng",
          map: "Đường Nguyễn Trãi, Phường Bến Thành, Quận 1, TP.HCM | Cách trung tâm thành phố 1.0 km",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Deluxe",
          TypeHotel : "Hotel",
          payment: "online",
          status: "Cập nhật lần cuối 3 phút trước",
          cost: 300000,
          type: 2,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v17126331",
          // amenities: JSON.stringify("[1,2,3, 4,9,7,8,5,12]"),
          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "LANGUAGE EXCHANGE HOTEL 3",
          rate: 3,
          // rating: 3,
          // comment: "Tốt, Nhiều tiện ích, đi lại dễ dàng",
          map: "Đường Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, TP.HCM | Cách trung tâm thành phố 1.5 km",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Premier",
          TypeHotel : "Hotel",
          payment: "online",
          status: "Cập nhật lần cuối 15 phút trước",
          cost: 324235,
          type: 3,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v17126331",
          // amenities: JSON.stringify("[1,2,3, 4,9,7,8,5,12]"),
          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Ehome Saigon ",
          rate: 2,
          // rating: 3,
          // comment: "Tốt, Nhiều tiện ích, đi lại dễ dàng",
          map: "Đường Phạm Ngũ Lão, Quận 1, TP.HCM | Cách trung tâm thành phố 1.1 km",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Suite",
          payment: "online",
          TypeHotel : "homestay",
          status: "Cập nhật lần cuối 9 phút trước",
          cost: 224235,
          type: 3,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",
          // amenities: JSON.stringify("[1,2,3, 4,9,7,8,5,12]"),
          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "SEA QUEEN HOTEL",
          rate: 3,
          // comment: "Dịch vụ tuyệt vời, vị trí đẹp",
          map: "157 Lê Quang Đạo, Bắc Mỹ Phú, Quận Ngũ Hành Sơn, Đà Nẵng",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Hai Giường Cao Cấp",
          TypeHotel : "Hotel",
          payment: "online",
          status: "Cập nhật lần cuối 15 phút trước",
          cost: 424901,
          type: 3,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",
          // amenities: "135",
          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Adina Hotel",
          rate: 3,
          map: "Đường Phạm Văn Đồng, An Hải Bắc, Sơn Trà, Đà Nẵng",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Đôi",
          payment: "online",
          TypeHotel : "resort",
          status: "Cập nhật lần cuối 7 phút trước",
          cost: 215195,
          type: 3,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Grand Ocean Luxury Boutique",
          rate: 4,
          map: "Phan Liêm, Bãi biển Mỹ Khê, Ngũ Hành Sơn, Đà Nẵng",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Hai Giường Cao Cấp",
          TypeHotel : "resort",
          payment: "online",
          status: "Cập nhật lần cuối  trước",
          cost: 504143,
          type: 3,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Hoang Sa Hotel",
          rate: 3,
          map: "Đường Đình Nghệ, An Hải Bắc, Sơn Trà, Đà Nẵng",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Superior",
          TypeHotel : "Hotel",
          payment: "online",
          status: "Cập nhật lần cuối 1 tiếng trước",
          cost: 255000,
          type: 3,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Sheration Hanoi Hotel",
          rate: 5,
          map: "K5 Nghi Tàm, 11 Đường Xuân Diệu, Tây Hồ, Hà Nội",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Hai Giường Sang Trọng",
          TypeHotel : "Hotel",
          payment: "online",
          status: "Cập nhật lần cuối 16 phút trước",
          cost: 4500000,
          type: 1,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Ravatel Luxury Hotel Bac Giang",
          rate: 4,
          map: "Số 1, Hùng Vương 1, Lê Lợi, Bắc Giang",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Đôi",
          TypeHotel: "homestay",
          payment: "online",
          status: "Cập nhật lần cuối 1 tiếng trước",
          cost: 612258,
          type: 1,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "InterContinental Hanoi Landmark72",
          rate: 4,
          map: "Keangnam Hanoi Landmark Tower, Lô E6, Cầu Giấy, Mễ Trì, Từ Liêm, Nam Từ Liêm, Hà Nội",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Giường King",
          TypeHotel: "Hotel",
          payment: "online",
          status: "Cập nhật lần cuối 12 phút trước",
          cost: 3374189,
          type: 1,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "JW Marriott Hotel Hanoi",
          rate: 5,
          payment: "online",
          map: "8 Đỗ Đức Dục, P.Mễ Trì, Q., Nam Từ Liêm, Hà Nội",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Giường Size King",
          TypeHotel: "Hotel",
          status: "Cập nhật lần cuối 23 phút trước",
          cost: 4900000,
          type: 1,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "New World Phu Quoc Resort",
          rate: 5,
          map: "Bãi Khem, An Thới, Đảo Phú Quốc, Kiên Giang",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Biệt thự có bể bơi",
          TypeHotel: "resort",
          payment: "online",
          status: "Cập nhật lần cuối 1 tiếng trước",
          cost: 6682230,
          type: 3,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "InterContinental Phu Quoc Long Beach Resort",
          rate: 5,
          map: "Bãi Trường, Xã, Dương Tơ, Đảo Phú Quốc, Kiên Giang",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Giường King",
          TypeHotel: "resort",
          payment: "online",
          status: "Cập nhật lần cuối 25 phút trước",
          cost: 5498680,
          type: 3,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Vinpearl Resort & Spa Phú Quốc",
          rate: 5,
          map: "Bai Dai, Gach Dau, Gành Dầu, Đảo Phú Quốc, Kiên Giang",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Hai Giường Đơn",
          TypeHotel: "resort",
          payment: "offline",
          status: "Cập nhật lần cuối 24 phút trước",
          cost: 2103174,
          type: 1,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Senna Hue Hotel",
          rate: 5,
          payment: "offline",
          map: "7 Nguyễn Tri Phương, Huế, Tỉnh Thừa Thiên-Huế",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Twin Premier",
          TypeHotel: "Hotel",
          payment: "offline",
          status: "Cập nhật lần cuối 2 tiếng trước",
          cost: 2195223,
          type: 3,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Khách sạn Melia Vipearl Huế",
          rate: 5,
          payment: "offline",
          map: "50A Hùng Vương, Huế, Tỉnh Thừa Thiên-Huế",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng The Level Deluxe",
          TypeHotel: "Hotel",
          status: "Cập nhật lần cuối 3 tiếng trước",
          cost: 2630974,
          type: 1,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Premier Pearl Hotel Vung Tau",
          rate: 4,
          map: "69 Thùy Vân, Vũng Tàu, Bà Rịa-Vũng Tàu",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Giường Queen",
          TypeHotel: "Hotel",
          payment: "offline",
          status: "Cập nhật lần cuối 1 tiếng trước",
          cost: 2468013,
          type: 1,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Xoài Homestay Vũng Tàu - The Sóng Apartment",
          rate: 4,
          map: "28 Đường Thi Sách, Vũng Tàu, Bà Rịa-Vũng Tàu",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Studio có ban công",
          TypeHotel: "homestay",
          payment: "offline",
          status: "Cập nhật lần cuối 10 phút trước",
          cost: 1543843,
          type: 3,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "La Villa Da Lat",
          rate: 4,
          map: "C21 KQH nghiên cứu đường Hùng Vương, Phường 11, Khu Chi Lăng, Đà Lạt, Lâm Đồng",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Biệt Thự Hướng Vườn",
          TypeHotel: "resort",
          payment: "offline",
          status: "Cập nhật lần cuối 1 ngày trước",
          cost: 16323628,
          type: 3,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "California Hotel",
          rate: 3,
          map: "A28 Nguyễn Hữu Cảnh, phường 8, Thành phố, Phường 8, Đà Lạt, Lâm Đồng",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Tiêu Chuẩn",
          TypeHotel: "Hotel",
          payment: "offline",
          status: "Cập nhật lần cuối 2 ngày trước",
          cost: 1632164,
          type: 1,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Le Macaron Boutique Hotel",
          rate: 3,
          map: "52 Trương Công Định, Phường 6, Đà Lạt, Lâm Đồng",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Comfort",
          TypeHotel: "Hotel",
          payment: "offline",
          status: "Cập nhật lần cuối 1 tiếng trước",
          cost: 1147637,
          type: 1,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Khách sạn Dalat Palace Heritage",
          rate: 5,
          map: "02 Trần Phú, Phường 3, Đà Lạt, Lâm Đồng",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Suite",
          TypeHotel: "Hotel",
          payment: "offline",
          status: "Cập nhật lần cuối 1 tiếng trước",
          cost: 5325334,
          type: 1,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Alma Resort Cam Ranh",
          rate: 5,
          map: "Bắc Bán đảo Cam Ranh, Xã Cam Hải Đông, Cam Lâm, Khánh Hòa",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Suite Superior 1 Phòng Ngủ",
          TypeHotel: "Resort",
          payment: "offline",
          status: "Cập nhật lần cuối 15 phút trước",
          cost: 3797382,
          type: 3,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Vinpearl Beachfront Nha Trang",
          rate: 5,
          map: "78-80 Trần Phú, P., Lộc Thọ, Nha Trang, Khánh Hòa",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Studio 2 Giường Đơn Nhìn Ra Thành Phố",
          TypeHotel: "service apartment",
          payment: "offline",
          status: "Cập nhật lần cuối 1 phút trước",
          cost: 1631393,
          type: 1,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "InterContinental Nha Trang, an IHG Hotel",
          rate: 5,
          payment: "offline",
          map: "32-34 Trần Phú, Lộc Thọ, Nha Trang, Khánh Hòa",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Premium Có 1 Giường Cỡ King Nhìn Ra Thành Phố",
          TypeHotel: "service apartment",
          status: "Cập nhật lần cuối 7 phút trước",
          cost: 4349044,
          type: 1,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Du thuyền Scarlet Pearl Cruises",
          rate: 5,
          map: "Cảng tàu khách quốc tế Hạ Long, Hạ Long, Quảng Ninh",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòng Suite có ban công",
          TypeHotel: "service apartment",
          payment: "offline",
          status: "Cập nhật lần cuối 12 phút trước",
          cost: 15256262,
          type: 1,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Muong Thanh Luxury Quang Ninh Hotel",
          rate: 5,
          map: "Đường Hạ Long, P.Bãi Cháy, Hạ Long, Quảng Ninh",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Phòn Deluxe",
          TypeHotel: "Hotel",
          payment: "offline",
          status: "Cập nhật lần cuối 1 ngày trước",
          cost: 1558709,
          type: 1,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

          createdAt: "2024-04-01 04:26:18",
          updatedAt: "2024-04-01 04:26:18",
        },
        {
          name: "Oakwood Hạ Long",
          rate: 4,
          map: "No 09 Hạ Long, Quảng Ninh",
          linkMap:
            "https://www.bing.com/maps?osid=8287cbc5-b48f-4946-a098-77f90af36702&cp=10.73704~106.723359&lvl=16&pi=0&imgid=f07e9c85-120a-4064-88a9-3f2b67ed86a8&v=2&sV=2&form=S00027",
          roomType: "Biệt Thự 1 Phòng Ngủ Nhìn Ra Vườn",
          TypeHotel: "Hotel",
          payment: "offline",
          status: "Cập nhật lần cuối 1 tiếng trước",
          cost: 3675617,
          type: 3,
          embedMap:
            "126174016106!2d106.65257207465578!3d10.801647189348664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291ee78ce6fd%3A0x7b051a4a0013e895!2sHoliday%20Inn%20%26%20Suites%20Saigon%20Airport%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2s!4v1712633107302",

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
    await queryInterface.bulkDelete("hotels", null, {});
  },
};
