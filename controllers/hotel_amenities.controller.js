const { HotelAmenities, Amenities, Hotels } = require("../models/");

// Controller để lấy danh sách các amenities của một khách sạn
async function getHotelAmenities(req, res) {
  const hotelId = req.params.hotelId;

  try {
    // Tìm khách sạn dựa trên hotelId
    const hotelAmenities = await HotelAmenities.findAll({
      where: { hotelId },
      include: [{ model: Amenities }],
    });

    res.json(hotelAmenities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getHotelHaveAmenities(req, res) {
  const amenityId = req.params.amenityId;

  try {
    // Tìm khách sạn dựa trên hotelId
    const hotelAmenities = await HotelAmenities.findAll({
      where: { amenityId },
      include: [{ model: Hotels }],
    });

    res.json(hotelAmenities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// POST /api/v1/hotels/amenities
async function searchHotelsByAmenities(req, res) {
  const { amenities } = req.body;

  try {
    // Tìm các khách sạn chứa các tiện nghi đã chọn
    const hotelAmenities = await HotelAmenities.findAll({
      where: {
        amenityId: amenities,
      },
      include: [{ model: Hotels }],
    });

    const hotels = hotelAmenities.map((hotelAmenity) => hotelAmenity.Hotel);

    res.json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// POST /api/v1/hotelAmenities
async function addHotelAmenity(req, res) {
  const { hotelId, amenityId } = req.body;

  try {
    const hotelAmenity = await HotelAmenities.create({
      hotelId,
      amenityId,
    });

    res.status(201).json(hotelAmenity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateHotelAmenity(req, res) {
  const hotelAmenityId = req.params.id;
  const { hotelId, amenityId } = req.body;

  try {
    const hotelAmenity = await HotelAmenities.findByPk(hotelAmenityId);

    if (!hotelAmenity) {
      return res.status(404).json({ message: "Hotel amenity not found" });
    }

    hotelAmenity.hotelId = hotelId;
    hotelAmenity.amenityId = amenityId;

    await hotelAmenity.save();

    res.json(hotelAmenity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteHotelAmenity(req, res) {
  const { id } = req.params;

  try {
    const RoomAmenity = await HotelAmenities.findOne({
      where: {
        id,
      },
    });
    if (!RoomAmenity) {
      return res.status(404).send("RoomAmen not found!");
    }
    await RoomAmenity.destroy();

    res.json({ message: "Room amenity deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getHotelAmenities,
  getHotelHaveAmenities,
  addHotelAmenity,
  updateHotelAmenity,
  deleteHotelAmenity,
  searchHotelsByAmenities,
};
