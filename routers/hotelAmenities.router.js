const { HotelAmenities } = require("../models");

const express = require("express");
const {
  getHotelAmenities,
  addHotelAmenity,
  updateHotelAmenity,
  deleteHotelAmenity,
  getHotelHaveAmenities,
  searchHotelsByAmenities,
} = require("../controllers/hotel_amenities.controller.js");

const HotelAmenityRouter = express.Router();

HotelAmenityRouter.get("/:hotelId", getHotelAmenities);
HotelAmenityRouter.get("/amenities/:amenityId", getHotelHaveAmenities);
HotelAmenityRouter.post("/", addHotelAmenity);
HotelAmenityRouter.put("/id", updateHotelAmenity);
HotelAmenityRouter.delete("/id", deleteHotelAmenity);
HotelAmenityRouter.post("/hotel/amenities", searchHotelsByAmenities);
module.exports = {
  HotelAmenityRouter,
};
