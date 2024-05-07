const { Room, Hotels, roomService, Amenities, UrlImageRoom } = require("../models");
const { Op } = require("sequelize");
const createRoom = async (req, res) => {
  const {
    name,
    status,
    price,
    quantity,
    quantity_people,
    hotelId,
    type_bed,
  } = req.body;

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
      const imagePath = file.path.replace(/^public/, ""); // Get relative path
      const imageUrl = `http://localhost:3000/${imagePath}`; // Construct full image URL

      // Create UrlImageRoom record associated with the new room
      const imageUrlRecord = await UrlImageRoom.create({
        url: imageUrl,
        IdRoom: newRoom.id, // Associate the UrlImageRoom with the new room
      });

      console.log("Created UrlImageRoom record:", imageUrlRecord);
    }

    // Send a success response with the newly created room
    res.status(201).send(newRoom);
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error creating room:", error);
    res.status(500).send({ error: "Failed to create room", message: error.message });
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
    detailRoom.address = address;
    detailRoom.star = star;
    detailRoom.price = price;
    await detailRoom.save();
    res.status(200).send(detailRoom);
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    room.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Successful");
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  createRoom,
  deleteRoom,
  updateRoom,
  getDetailRoom,
  getAllRoom,
};
