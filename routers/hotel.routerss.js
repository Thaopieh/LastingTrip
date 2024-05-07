const { Hotels } = require("../models");
const {uploadImage2} = require ("../middlewares/upload/upload-mutileImage.js")
const express = require("express");
const {
  createHotel,
  getAllHotel,
  getDetailHotel,
} = require("../controllers/hotel.controllers.js");

const HotelRouter = express.Router();
HotelRouter.post("/", uploadImage2("hotel", 10),createHotel);
HotelRouter.get("/", getAllHotel);
HotelRouter.get("/:id", getDetailHotel);

// HotelRouter.put("/:id", checkExist(Hotel), updateHotel);
// HotelRouter.delete("/:id", checkExist(Hotel), deleteHotel);

module.exports = {
  HotelRouter,
};
