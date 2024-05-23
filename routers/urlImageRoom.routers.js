const express = require("express");
const urlImageRoom = express.Router();
const { uploadImage2 } = require("../middlewares/upload/upload-mutileImage.js");
const uploadCloud = require("../middlewares/upload/cloudinary.config");
const {
  deleteImageMiddleware,
} = require("../middlewares/upload/delete-image.js");
const {
  createUrlImageRoom,
  getUrlImageRoomById,
  updateUrlImageRoom,
  deleteUrlImageRoom,
  getAllUrlImageRoom,
} = require("../controllers/urlImageRoom.controller.js");

// Create a new UrlImageHotel
urlImageRoom.post("/", uploadCloud.array("room", 10), createUrlImageRoom);

// Get UrlImageHotel by ID
urlImageRoom.get("/", getUrlImageRoomById);

urlImageRoom.get("/getAllUrlImageRoom", getAllUrlImageRoom);

// Delete UrlImageHotel by ID
urlImageRoom.delete("/:id", deleteUrlImageRoom);

module.exports = {
  urlImageRoom,
};
