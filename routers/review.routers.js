const express = require("express");
const { Reviews } = require("../models");
const {
  createReview,
  deleteReview,
  getAllReview,
  updateReview,
  uploadFile,
} = require("../controllers/reviews.controllers");
const { authenticate } = require("../middlewares/authen/authenticate");
const { authorize } = require("../middlewares/authen/authorize");
const { checkExist } = require("../middlewares/validations/checkExist");
const { uploadImage } = require("../middlewares/upload/upload-image");
const ReviewRouter = express.Router();

ReviewRouter.post("/create", uploadImage(), createReview);

ReviewRouter.post("/upFile", authenticate, uploadImage(), uploadFile);

ReviewRouter.get("/", getAllReview);
ReviewRouter.put("/:id", checkExist(Reviews), updateReview);
ReviewRouter.delete("/:id", checkExist(Reviews), deleteReview);
module.exports = {
  ReviewRouter,
};
