const { roomAmenities } = require("../models");

const express = require("express");
const {
  getroomService,
  addRoomAmenity,
  updateRoomAmenity,
  deleteRoomAmenity,
  getRoomHaveAmenities,
  searchRoomsByAmenities,
} = require("../controllers/room_service.controller.js");

const RoomAmenityRouter = express.Router();

RoomAmenityRouter.get("/:roomId", getroomService);
RoomAmenityRouter.get("/amenities/:serviceId", getRoomHaveAmenities);
RoomAmenityRouter.post("/", addRoomAmenity);
RoomAmenityRouter.put("/id", updateRoomAmenity);
RoomAmenityRouter.delete("/id", deleteRoomAmenity);
RoomAmenityRouter.post("/Room/amenities", searchRoomsByAmenities);
module.exports = {
  RoomAmenityRouter,
};
