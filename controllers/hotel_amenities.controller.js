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
async function getHotelAmenitiesByID(req, res) {
  const id = req.params.id;

  try {
    // Tìm khách sạn dựa trên hotelId
    const hotelAmenities = await HotelAmenities.findAll({
     where : {id : id}
    });

    res.status(200).send(hotelAmenities);
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
  console.log(req.body);

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
}async function updateHotelAmenity(req, res) {
  const id = req.params.id;
  console.log(req);
  const {  hotelId, amenityId } = req.body;
  console.log(id, " ", hotelId, " ", amenityId)
  try {
    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!id || !hotelId || !amenityId) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // Tìm hotelAmenity dựa trên id
    const hotelAmenity = await HotelAmenities.findByPk(id);

    // Kiểm tra nếu không tìm thấy hotelAmenity
    if (!hotelAmenity) {
      return res.status(404).json({ message: "Hotel amenity not found" });
    }

    // Cập nhật hotelId và amenityId
    hotelAmenity.hotelId = hotelId;
    hotelAmenity.amenityId = amenityId;

    // Lưu lại thông tin đã cập nhật
    await hotelAmenity.save();

    // Trả về thông tin hotelAmenity đã được cập nhật
    res.json(hotelAmenity);
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteHotelAmenity(req, res) {
  const { id } = req.params; // Extract the id parameter from req.params

  try {
    const hotelAmenity = await HotelAmenities.findByPk(id); // Find the hotel amenity by id

    if (!hotelAmenity) {
      return res.status(404).json({ message: "Hotel amenity not found" });
    }

    await hotelAmenity.destroy(); // Delete the hotel amenity

    res.json({ message: "Hotel amenity deleted successfully" });
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
  getHotelAmenitiesByID
};
