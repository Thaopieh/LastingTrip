const { HotelAmenities } = require("../models");

const express = require("express");
const {
  getHotelAmenities,
  addHotelAmenity,
  getHotelAmenitiesByID,
  updateHotelAmenity,
  deleteHotelAmenity,
  getHotelHaveAmenities,
  searchHotelsByAmenities,
} = require("../controllers/hotel_amenities.controller.js");

const HotelAmenityRouter = express.Router();

HotelAmenityRouter.get("/:hotelId", getHotelAmenities);
HotelAmenityRouter.get("/amenities/:id", getHotelAmenitiesByID);
HotelAmenityRouter.post("/", addHotelAmenity);
HotelAmenityRouter.put("/:id", updateHotelAmenity);
HotelAmenityRouter.delete("/:id", deleteHotelAmenity);
HotelAmenityRouter.post("/hotel/amenities", searchHotelsByAmenities);
module.exports = {
  HotelAmenityRouter,
};
