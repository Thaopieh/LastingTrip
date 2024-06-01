const { Hotels } = require("../models");
const { uploadImage2 } = require("../middlewares/upload/upload-mutileImage.js");
const uploadCloud = require("../middlewares/upload/cloudinary.config");
const { checkExist } = require("../middlewares/validations/checkExist.js");
const express = require("express");
const {
  createHotel,
  getAllHotel,
  getDetailHotel,
  updateHotel,
  deleteHotel,
  searchIdHotelByName,
  getAllMaps,
} = require("../controllers/hotel.controllers.js");

const HotelRouter = express.Router();
HotelRouter.post("/", uploadCloud.array("hotel", 10), createHotel);
// HotelRouter.post("/", createHotel);
HotelRouter.get("/getAllMap", getAllMaps);
HotelRouter.get("/", getAllHotel);
HotelRouter.get("/:id", getDetailHotel);

HotelRouter.put("/updateHotel/:id", checkExist(Hotels), updateHotel);
HotelRouter.delete("/deleteHotel/:id", checkExist(Hotels), deleteHotel);
HotelRouter.post("/getIdByHotelName", searchIdHotelByName);

module.exports = {
  HotelRouter,
};
