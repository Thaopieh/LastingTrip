const {
  Hotels,
  Room,
  HotelAmenities,
  Amenities,
  Reviews,
  UrlImageHotel
} = require("../models");
const { Op, literal } = require("sequelize");
// const amenities = require("../models/amenities");
const createHotel = async (req, res) => {
  const { name, rate, map, roomType, TypeHotel, status, cost, type, payment } = req.body;

  try {
    // Create the hotel record
    const newHotel = await Hotels.create({
      name,
      rate,
      map,
      roomType,
      TypeHotel,
      status,
      cost,
      type,
      payment,
    });
    console.log(newHotel);
    const { files } = req;
    console.log(files);
    // Iterate over each file and create a corresponding UrlImageHotel record
    for (const file of files) {
      const imagePath = file.path.replace(/^public/, ""); // Get relative path
      const imageUrl = `http://localhost:3000/${imagePath}`; // Construct full image URL

      // Create UrlImageHotel record associated with the new hotel
      const imageUrlRecord = await UrlImageHotel.create({
        url: imageUrl,
        HotelId: newHotel.id
      });

      console.log("Created UrlImageHotel record:", imageUrlRecord);
    }

    // Send the response with the newly created hotel
    res.status(201).send(newHotel);
  } catch (error) {
    console.error("Error creating hotel:", error);
    res.status(500).send(error);
  }
};


function getOrderCriteria(sortType) {
  switch (sortType) {
    case "asc_price":
      return [["cost", "ASC"]];
    case "desc_price":
      return [["cost", "DESC"]];
    case "desc_rating":
      return [["rate", "DESC"]];
    default:
      return []; // Default to no sorting
  }
}
const getAllHotel = async (req, res) => {
  const {
    services_hotel,
    services_room,
    name,
    map,
    bed_type,
    payment,
    room_type,
    array_hotel,
    numberOfRooms,
    numberOfAdults,
    numberOfChildren,
    type_hotel,
    sortType,
    price,
  } = req.query;

  try {
    let whereClause = {};

    // Build whereClause based on query parameters for the Hotels table
    if (name) {
      whereClause.name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (map) {
      whereClause.map = {
        [Op.like]: `%${map}%`,
      };
    }

    if (price) {
      whereClause.cost = {
        [Op.gte]: price,
      };
    }

    if (payment) {
      whereClause.payment = {
        [Op.eq]: payment,
      };
    }

    if (array_hotel && Array.isArray(array_hotel) && array_hotel.length > 0) {
      whereClause.name = {
        [Op.in]: array_hotel,
      };
    }

    if (type_hotel) {
      whereClause.TypeHotel = {
        [Op.in]: type_hotel,
      };
    }

    // Create an array to hold include conditions for the findAll query
    const include = [];

    // Check services_hotel before usage
    if (
      services_hotel &&
      Array.isArray(services_hotel) &&
      services_hotel.length > 0
    ) {
      const amenityIds = services_hotel.map(Number);

      // Create a subquery to check hotels containing all `amenityIds`
      const subquery = `
        SELECT HA.hotelId
        FROM HotelAmenities HA
        WHERE HA.amenityId IN (${amenityIds.join(",")})
        GROUP BY HA.hotelId
        HAVING COUNT(DISTINCT HA.amenityId) = ${amenityIds.length}
      `;

      // Use EXISTS with a subquery in the where clause
      whereClause.id = {
        [Op.in]: literal(`(${subquery})`),
      };
    }

    // Conditionally include Room based on bed_type or room_type
    if (
      bed_type ||
      room_type ||
      numberOfRooms ||
      numberOfAdults ||
      numberOfChildren ||
      services_room
    ) {
      const roomWhereClause = {};

      if (bed_type) {
        roomWhereClause.type_bed = bed_type;
      }

      if (room_type) {
        roomWhereClause.type_room = room_type;
      }

      if (numberOfRooms) {
        roomWhereClause.quantity = { [Op.gte]: parseInt(numberOfRooms) };
      }

      if (services_room && services_room.length > 0) {
        // Construct subquery to find roomIds with all specified serviceIds
        const subquery = `
          SELECT roomId
          FROM RoomServices
          WHERE serviceId IN (${services_room.join(",")})
          GROUP BY roomId
          HAVING COUNT(DISTINCT serviceId) = ${services_room.length}
        `;

        // Use subquery to filter rooms
        roomWhereClause.id = {
          [Op.in]: literal(`(${subquery})`),
        };
      }

      if (numberOfAdults || numberOfChildren) {
        const totalGuests =
          parseInt(numberOfAdults) + parseInt(numberOfChildren);
        roomWhereClause.quantity_people = {
          [Op.gte]: totalGuests,
        };
      }

      // Thêm mô hình Room vào câu truy vấn chính với điều kiện `roomWhereClause`
      include.push({
        model: Room,
        where: roomWhereClause,
      });

      console.log("roomWhereClause:", roomWhereClause);
    }

    // Find hotels that match the conditions from the Hotels table
    const hotelList = await Hotels.findAll({
      where: whereClause,
      include: [
        ...include,
        {
          model: Reviews,
          as: "Reviews",
        },
      ],
      order: getOrderCriteria(sortType),
    });

    res.status(200).send(hotelList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllHotel,
};

const getDetailHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const detailHotel = await Hotels.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Room, // Include thông tin về phòng của khách sạn
        },
        {
          model: HotelAmenities, // Include thông tin về tiện nghi của khách sạn
          required: false, // Đặt required là false để không yêu cầu phải có bản ghi trong HotelAmenities
          include: [
            {
              model: Amenities, // Include thông tin chi tiết về amenities
            },
          ],
        },
        {
          model: Reviews, // Include thông tin về đánh giá của khách sạn
          as: "Reviews", // Optional alias for the included reviews
        },
      ],
    });
    res.status(200).send(detailHotel);
  } catch (error) {
    res.status(500).send(error);
  }
};

// const updateHotel = async (req, res) => {
//   const { id } = req.params;
//   const { name, adress, province } = req.body;
//   try {
//     const detailHotel = await Hotels.findOne({
//       where: {
//         id,
//       },
//     });
//     detailHotel.name = name;
//     detailHotel.adress = adress;
//     detailHotel.province = province;
//     await detailHotel.save();
//     res.status(200).send(detailHotel);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // const deleteHotel = async (req, res) => {
// //   const { id } = req.params;
// //   try {
// //     await Hotel.destroy({
// //       where: {
// //         id,
// //       },
// //     });
// //     res.status(200).send("xoa thanh cong");
// //   } catch (error) {
// //     res.status(500).send(error);
// //   }
// // };

module.exports = {
  createHotel,
  getAllHotel,
  getDetailHotel,
  //   updateHotel,
  //   deleteHotel,
};
