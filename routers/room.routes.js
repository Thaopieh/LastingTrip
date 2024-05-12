const express = require("express");
const { Room } = require("../models");
const { uploadImage2 } = require("../middlewares/upload/upload-mutileImage.js");
const {
  createRoom,
  deleteRoom,
  getAllRoom,
  getDetailRoom,
  updateRoom,
} = require("../controllers/room.controller");
const { authenticate } = require("../middlewares/authen/authenticate");
const { authorize } = require("../middlewares/authen/authorize");
const { checkExist } = require("../middlewares/validations/checkExist");
const roomRouter = express.Router();
roomRouter.post("/", uploadImage2("room"), createRoom);
roomRouter.get("/", getAllRoom);
roomRouter.put("/:id", checkExist(Room), updateRoom);
roomRouter.delete("/:id", checkExist(Room), deleteRoom);
module.exports = {
  roomRouter,
};
