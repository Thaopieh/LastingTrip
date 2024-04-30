const { Station } = require("../models");
const { checkExist } = require("../middlewares/validations/checkExist");

const express = require("express");
const {
  createStation,
  getAllStation,
  getDetailStation,
  updateStation,
  deleteStation,
} = require("../controllers/station.controllers");

const stationRouter = express.Router();

stationRouter.post("/", createStation);
stationRouter.get("/", getAllStation);
stationRouter.get("/:id", getDetailStation);
stationRouter.put("/:id", checkExist(Station), updateStation);
stationRouter.delete("/:id", checkExist(Station), deleteStation);

module.exports = {
  stationRouter,
};
