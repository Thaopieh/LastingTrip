const express = require("express");
const { Reviews } = require("../models");
const {
  createReview,
  deleteReview,
  getAllReview,
  updateReview,
} = require("../controllers/reviews.controllers");
const { authenticate } = require("../middlewares/authen/authenticate");
const { authorize } = require("../middlewares/authen/authorize");
const { checkExist } = require("../middlewares/validations/checkExist");
const ReviewRouter = express.Router();

ReviewRouter.post("/create", createReview);
ReviewRouter.get("/", getAllReview);
ReviewRouter.put("/:id", checkExist(Reviews), updateReview);
ReviewRouter.delete("/:id", checkExist(Reviews), deleteReview);
module.exports = {
  ReviewRouter,
};
