const { Hotels } = require("../models");
const { uploadImage2 } = require("../middlewares/upload/upload-mutileImage.js");
const { checkExist } = require("../middlewares/validations/checkExist.js");
const express = require("express");
const {
  createHotel,
  getAllHotel,
  getDetailHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotel.controllers.js");

const HotelRouter = express.Router();
HotelRouter.post("/", uploadImage2("hotel", 10), createHotel);
HotelRouter.get("/", getAllHotel);
HotelRouter.get("/:id", getDetailHotel);

HotelRouter.put("/updateHotel/:id", checkExist(Hotels), updateHotel);
HotelRouter.delete("/deleteHotel/:id", checkExist(Hotels), deleteHotel);

module.exports = {
  HotelRouter,
};
