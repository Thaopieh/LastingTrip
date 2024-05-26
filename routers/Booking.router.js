const { Booking } = require("../models");
const { checkExist } = require("../middlewares/validations/checkExist.js");
const express = require("express");
const {
  createBooking,
  getAllBooking,
  getDetailBooking,
  deleteBooking,
  getAvailability,
} = require("../controllers/payment.controller");

const BookingRouter = express.Router();
BookingRouter.post("/", createBooking);
BookingRouter.get("/", getAllBooking);
BookingRouter.get("/getDetail/:id", getDetailBooking);
BookingRouter.get("/checkAvailability", getAvailability);

BookingRouter.delete("/:id", checkExist(Booking), deleteBooking);

module.exports = {
  BookingRouter,
};
