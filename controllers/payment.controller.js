const { Booking, Room, User, Hotels } = require("../models");
const { Op, sequelize } = require("sequelize");

const createBooking = async (req, res) => {
  const {
    room_id,
    user_id,
    check_in_date,
    check_out_date,
    total_price,
    status,
    special_requests,
    quantity,
    full_name,
    hotel_id,
  } = req.body;

  try {
    // Kiểm tra tính khả dụng của phòng
    const room = await Room.findOne({ where: { id: room_id } });
    if (!room) {
      return res.status(400).send({ message: "Room not found" });
    }

    const bookedQuantity = await Booking.sum("quantity", {
      where: {
        room_id,
        check_in_date: { [Op.lt]: check_out_date },
        check_out_date: { [Op.gt]: check_in_date },
      },
    });

    if ((bookedQuantity || 0) + quantity > room.quantity) {
      return res
        .status(400)
        .send({ message: `Not enough rooms available for the selected dates` });
    }

    // Tạo một bản ghi Booking
    const newBooking = await Booking.create({
      room_id,
      user_id,
      check_in_date,
      check_out_date,
      total_price,
      status,
      special_requests,
      quantity,
      full_name,
      hotel_id,
    });

    res.status(201).send(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).send(error);
  }
};

const getAllBooking = async (req, res) => {
  const {
    room_id,
    user_id,
    check_in_date,
    check_out_date,
    total_price,
    status,
    special_requests,
    full_name,
    hotel_id,
  } = req.query;
  let whereClause = {};

  // Tạo điều kiện tìm kiếm dựa trên các query parameter được cung cấp
  if (room_id) whereClause.room_id = room_id;
  if (user_id) whereClause.user_id = user_id;
  if (hotel_id) whereClause.hotel_id = hotel_id;
  if (total_price) whereClause.total_price = total_price;
  if (status) whereClause.status = status;
  if (special_requests) whereClause.special_requests = special_requests;
  if (full_name) whereClause.full_name = full_name;
  if (check_in_date) whereClause.check_in_date = { [Op.gte]: check_in_date };
  if (check_out_date) whereClause.check_out_date = { [Op.lte]: check_out_date };

  try {
    let bookings;

    // Kiểm tra xem whereClause có bất kỳ điều kiện nào không
    if (Object.keys(whereClause).length === 0) {
      // Nếu không có điều kiện nào, tìm tất cả các booking
      bookings = await Booking.findAll({
        include: [
          {
            model: Hotels,
            attributes: ["id", "name"],
          },
        ],
      });
    } else {
      // Nếu có điều kiện, tìm các booking dựa trên điều kiện đã được xác định
      bookings = await Booking.findAll({
        where: whereClause,
      });
    }

    res.status(200).send(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).send(error);
  }
};

const getDetailBooking = async (req, res) => {
  const { id } = req.params;

  try {
    // Tìm kiếm chi tiết đặt phòng dựa trên ID
    const booking = await Booking.findOne({
      where: { id },
      include: [
        {
          model: Room,
          attributes: ["id", "name", "price", "hotelId"],
          include: [
            {
              model: Hotels, // Thay `Hotel` bằng tên của mô hình Hotel trong mã của bạn
              attributes: ["name"], // Chọn các thuộc tính cần lấy từ mô hình Hotel
            },
          ],
        },
        { model: User, attributes: ["id", "name", "email", "numberPhone"] },
      ],
    });

    if (!booking) {
      return res.status(404).send({ message: "Booking not found" });
    }

    res.status(200).send(booking);
  } catch (error) {
    console.error("Error fetching booking details:", error);
    res.status(500).send(error);
  }
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    // Tìm và xóa đặt phòng dựa trên ID
    const deletedBooking = await Booking.destroy({
      where: { id },
    });

    if (!deletedBooking) {
      return res.status(404).send({ message: "Booking not found" });
    }

    res.status(200).send({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).send(error);
  }
};

const getAvailability = async (req, res) => {
  const { checkInDate, checkOutDate, roomId, quantity } = req.query;

  try {
    // Fetch the room details
    const room = await Room.findOne({ where: { id: roomId } });
    if (!room) {
      return res.status(400).send({ message: "Room not found" });
    }

    // Calculate the total quantity of rooms already booked for the given date range
    const bookedQuantity = await Booking.sum("quantity", {
      where: {
        room_id: roomId,
        check_in_date: { [Op.lt]: checkOutDate },
        check_out_date: { [Op.gt]: checkInDate },
      },
    });

    // Calculate available quantity
    const availableQuantity = room.quantity - (bookedQuantity || 0);

    if (availableQuantity < quantity) {
      return res
        .status(400)
        .send({ message: "Not enough rooms available for the selected dates" });
    } else res.status(200).send({ availableQuantity });
  } catch (error) {
    console.error("Error checking room availability:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  createBooking,
  getAllBooking,
  getDetailBooking,
  deleteBooking,
  getAvailability,
};
