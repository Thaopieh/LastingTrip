const {
  Room,
  Hotels,
  roomService,
  Amenities,
  UrlImageRoom,
} = require("../models");
const cloudinary = require("cloudinary").v2;
const { Op } = require("sequelize");
const createRoom = async (req, res) => {
  const { name, status, price, quantity, quantity_people, hotelId, type_bed } =
    req.body;
  console.log(req.body);
  try {
    // Create a new room record in the database
    const newRoom = await Room.create({
      name,
      status,
      price,
      quantity,
      quantity_people,
      hotelId,
      type_bed,
    });

    // Retrieve uploaded files from the request
    const { files } = req;
    console.log(files);
    // Iterate over each file and create a corresponding UrlImageRoom record
    for (const file of files) {
      const imagePath = file.path;
      const name = file.filename;

      // Create UrlImageHotel record associated with the new hotel
      const imageUrlRecord = await UrlImageRoom.create({
        url: imagePath,
        file_name: name,
        IdRoom: newRoom.id,
      });

      console.log("Created UrlImageRoom record:", imageUrlRecord);
    }

    // Send a success response with the newly created room
    res.status(201).send(newRoom);
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error creating room:", error);
    res
      .status(500)
      .send({ error: "Failed to create room", message: error.message });
  }
};
const getAllRoom = async (req, res) => {
  const { hotelId } = req.query;

  try {
    let whereClause = {};

    if (hotelId) {
      whereClause.hotelId = hotelId; // Sử dụng hotelId từ req.query
    }

    // Tìm tất cả các phòng phù hợp với điều kiện từ bảng Room
    const roomList = await Room.findAll({
      where: whereClause,
      include: [
        {
          model: Hotels, // Include thông tin của Hotel
          as: "Hotel", // Đặt alias là "Hotel"
        },
        {
          model: roomService, // Include thông tin về dịch vụ của phòng
          include: [
            {
              model: Amenities, // Include thông tin của dịch vụ
              as: "Amenity", // Đặt alias là "Amenity"
            },
          ],
        },
        {
          model: UrlImageRoom,
        },
      ],
    });

    res.status(200).send(roomList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const detailroom = await Room.findOne({
      where: {
        id,
      },
    });
    res.status(200).send(detailroom);
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { name, status, price, quantity, quantity_people, type_bed } = req.body;
  try {
    const detailRoom = await Room.findOne({
      where: {
        id,
      },
    });
    detailRoom.name = name;
    detailRoom.status = status;
    detailRoom.quantity = quantity;
    detailRoom.quantity_people = quantity_people;
    detailRoom.type_bed = type_bed;
    detailRoom.price = price;
    await detailRoom.save();
    res.status(200).send(detailRoom);
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteRoom = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    // Tìm khách sạn cần xóa
    const deletedRoom = await Room.findOne({
      where: {
        id,
      },
    });

    if (!deletedRoom) {
      return res.status(404).send("Không tìm thấy khách sạn");
    }

    // Tìm tất cả các hình ảnh liên quan đến khách sạn này
    const imagesToDelete = await UrlImageRoom.findAll({
      where: {
        IdRoom: id,
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
    await deletedRoom.destroy({ cascade: true });

    // Phản hồi thành công sau khi xóa khách sạn và hình ảnh
    res.status(200).send("Xóa khách sạn và các hình ảnh liên quan thành công");
  } catch (error) {
    console.error("Lỗi khi xóa khách sạn và hình ảnh:", error);
    res.status(500).send("Lỗi máy chủ nội bộ");
  }
};
module.exports = {
  createRoom,
  deleteRoom,
  updateRoom,
  getDetailRoom,
  getAllRoom,
};
