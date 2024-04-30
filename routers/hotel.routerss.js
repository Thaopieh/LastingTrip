const { Hotels } = require("../models");

const express = require("express");
const {
  createHotel,
  getAllHotel,
  getDetailHotel,
  getHotelsByType,
  //   updateHotel,
  //   deleteHotel,
} = require("../controllers/hotel.controllers.js");

const HotelRouter = express.Router();

HotelRouter.post("/", createHotel);
HotelRouter.get("/", getAllHotel);
HotelRouter.get("/:id", getDetailHotel);

// HotelRouter.put("/:id", checkExist(Hotel), updateHotel);
// HotelRouter.delete("/:id", checkExist(Hotel), deleteHotel);

module.exports = {
  HotelRouter,
};
