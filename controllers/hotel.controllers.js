const {
  Hotels,
  Room,
  HotelAmenities,
  Amenities,
  Reviews,
  UrlImageHotel,
} = require("../models");
const { Op, literal } = require("sequelize");
const { sequelize } = require("../models");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const amenities = require("../models/amenities");
const createHotel = async (req, res) => {
  const { name, star, map, TypeHotel, payment, ownerId } = req.body;

  try {
    // Create the hotel record
    const newHotel = await Hotels.create({
      name,
      star,
      map,
      TypeHotel,
      payment,
      ownerId,
    });
    console.log(newHotel);
    const { files } = req;
    console.log(files);
    // Iterate over each file and create a corresponding UrlImageHotel record
    for (const file of files) {
      const imagePath = file.path;
      const name = file.filename;

      // Create UrlImageHotel record associated with the new hotel
      const imageUrlRecord = await UrlImageHotel.create({
        url: imagePath,
        file_name: name,
        HotelId: newHotel.id,
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
      return [["star", "DESC"]];
    case "desc_feedback":
      return [["userRating", "DESC"]];
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
        {
          model: Room,
        },
        {
          model: UrlImageHotel,
          as: "UrlImageHotels",
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
        {
          model: UrlImageHotel,
          as: "UrlImageHotels",
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

const updateHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const { name, star, map, TypeHotel, cost, payment, ownerId } = req.body;
    const detailHotel = await Hotels.findOne({
      where: {
        id: hotelId,
      },
    });
    if (!detailHotel) {
      res.status(400).send({
        status: `error`,
        message: `Hotel with id ${id}  not found`,
      });
    }
    if (name) detailHotel.name = name;
    if (star) detailHotel.star = star;
    if (map) detailHotel.map = map;
    if (cost) detailHotel.cost = cost;
    if (TypeHotel) detailHotel.TypeHotel = TypeHotel;
    if (payment) detailHotel.payment = payment;
    if (ownerId) detailHotel.ownerId = ownerId;

    const updateHotel = await detailHotel.save();
    if (!updateHotel)
      res.status(400).send({
        error: `error`,
        message: `Data fail to ${id} update`,
      });
    res.status(200).send({ updateHotel });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteHotel = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    // Tìm khách sạn cần xóa
    const deletedHotel = await Hotels.findOne({
      where: {
        id,
      },
    });

    if (!deletedHotel) {
      return res.status(404).send("Không tìm thấy khách sạn");
    }

    // Tìm tất cả các hình ảnh liên quan đến khách sạn này
    const imagesToDelete = await UrlImageHotel.findAll({
      where: {
        HotelId: id,
      },
    });

    // Xóa các hình ảnh từ Cloudinary và cơ sở dữ liệu
    const deleteImagePromises = imagesToDelete.map(async (image) => {
      // Xóa hình ảnh từ Cloudinary bằng public_id hoặc
      console.log(image.file_name);
      const results = await cloudinary.uploader.destroy(image.file_name);
      console.log(results);
      // Xóa bản ghi hình ảnh từ cơ sở dữ liệu
      await image.destroy();
    });

    // Chờ cho tất cả các hành động xóa hình ảnh hoàn tất
    await Promise.all(deleteImagePromises);

    // Sau khi đã xóa hết các hình ảnh liên quan, tiến hành xóa khách sạn
    await deletedHotel.destroy({ cascade: true });

    // Phản hồi thành công sau khi xóa khách sạn và hình ảnh
    res.status(200).send("Xóa khách sạn và các hình ảnh liên quan thành công");
  } catch (error) {
    console.error("Lỗi khi xóa khách sạn và hình ảnh:", error);
    res.status(500).send("Lỗi máy chủ nội bộ");
  }
};

const searchIdHotelByName = async (req, res) => {
  const { hotelName } = req.body; // Lấy tên khách sạn từ body của yêu cầu

  try {
    // Tìm khách sạn dựa trên tên
    const hotel = await Hotels.findOne({
      where: {
        name: hotelName,
      },
    });

    // Kiểm tra xem khách sạn có tồn tại không
    if (!hotel) {
      return res.status(404).json({ message: "Không tìm thấy khách sạn" });
    }

    // Gửi hotelId của khách sạn tìm được
    res.status(200).json({ hotelId: hotel.id });
  } catch (error) {
    console.error("Lỗi khi tìm kiếm khách sạn:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};
const getAllMaps = async (req, res) => {
  try {
    // Lấy tất cả các địa chỉ từ bảng Hotels
    const [hotels] = await sequelize.query("SELECT map FROM Hotels");

    // Tách các quận từ các địa chỉ này
    const districts = new Set();
    hotels.forEach((hotel) => {
      const maps = hotel.map.split(","); // Giả sử các quận ngăn cách bằng dấu phẩy
      maps.forEach((map) => {
        districts.add(map.trim());
      });
    });

    // Chuyển Set sang Array để dễ xử lý
    const districtArray = Array.from(districts);

    // Trả về danh sách các quận
    res.status(200).json(districtArray);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách địa chỉ khách sạn:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

module.exports = {
  createHotel,
  getAllHotel,
  getDetailHotel,
  updateHotel,
  deleteHotel,
  searchIdHotelByName,
  getAllMaps,
};
