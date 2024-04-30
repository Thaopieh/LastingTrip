const express = require("express");
const { room } = require("../models");
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
roomRouter.post("/", authenticate, authorize(["ADMIN"], ["BOSS"]), createRoom);
roomRouter.get("/", getAllRoom);
roomRouter.put("/:id", checkExist(room), updateRoom);
roomRouter.delete("/:id", checkExist(room), deleteRoom);
module.exports = {
  roomRouter,
};
