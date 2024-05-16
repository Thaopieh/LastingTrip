const { roomService, Amenities, Room } = require("../models/");

// Controller để lấy danh sách các amenities của một khách sạn
async function getroomService(req, res) {
  const roomId = req.params.roomId;

  try {
    // Tìm khách sạn dựa trên roomId
    const RoomService = await roomService.findAll({
      where: { roomId },
      include: [{ model: Amenities }],
    });

    res.json(RoomService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getService(req, res) {
  const {id} = req.params;

  try {
    // Tìm khách sạn dựa trên roomId
    const RoomService = await roomService.findAll({
      where: { id : id },
      
    });

    res.json(RoomService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getRoomHaveAmenities(req, res) {
  const serviceId = req.params.serviceId;

  try {
    // Tìm khách sạn dựa trên roomId
    const RoomService = await roomService.findAll({
      where: { serviceId },
      include: [{ model: Room }],
    });

    res.json(RoomService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// POST /api/v1/Rooms/amenities
async function searchRoomsByAmenities(req, res) {
  const { amenities } = req.body;

  try {
    // Tìm các khách sạn chứa các tiện nghi đã chọn
    const RoomService = await roomService.findAll({
      where: {
        serviceId: amenities,
      },
      include: [{ model: Room }],
    });

    const Rooms = RoomService.map((RoomAmenity) => RoomAmenity.Room);

    res.json(Rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// POST /api/v1/roomService
async function addRoomAmenity(req, res) {
  const { roomId, serviceId } = req.body;

  try {
    const RoomAmenity = await roomService.create({
      roomId,
      serviceId,
    });

    res.status(201).json(RoomAmenity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateRoomAmenity(req, res) {
  const RoomserviceId = req.params.id;
  const { roomId, serviceId } = req.body;

  try {
    const RoomAmenity = await roomService.findByPk(RoomserviceId);

    if (!RoomAmenity) {
      return res.status(404).json({ message: "Room amenity not found" });
    }

    RoomAmenity.roomId = roomId;
    RoomAmenity.serviceId = serviceId;

    await RoomAmenity.save();

    res.json(RoomAmenity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteRoomAmenity(req, res) {
  const RoomserviceId = req.params.id;

  try {
    const RoomAmenity = await roomService.findByPk(RoomserviceId);

    if (!RoomAmenity) {
      return res.status(404).json({ message: "Room amenity not found" });
    }

    await RoomAmenity.destroy();

    res.json({ message: "Room amenity deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getroomService,
  getService,
  getRoomHaveAmenities,
  addRoomAmenity,
  updateRoomAmenity,
  deleteRoomAmenity,
  searchRoomsByAmenities,
};
