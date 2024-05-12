const express = require("express");
const urlImageHotel = express.Router();
const { deleteImageMiddleware } = require("../middlewares/upload/delete-image");
const { uploadImage2 } = require("../middlewares/upload/upload-mutileImage.js");
const {
  createUrlImageHotel,
  getUrlImageHotelById,
  deleteUrlImageHotel,
  updateUrlImageHotel,
} = require("../controllers/urlimagehotel.controller");

// Create a new UrlImageHotel
urlImageHotel.post("/", uploadImage2("hotel", 10), createUrlImageHotel);

// Get UrlImageHotel by ID
urlImageHotel.get("/", getUrlImageHotelById);
// Update UrlImageHotel by ID
urlImageHotel.put("/:id", updateUrlImageHotel);

// Delete UrlImageHotel by ID
urlImageHotel.delete("/", deleteImageMiddleware, deleteUrlImageHotel);

module.exports = {
  urlImageHotel,
};
