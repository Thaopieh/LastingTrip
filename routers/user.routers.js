const { User } = require("../models");
// const { checkExist } = require("../middlewares/validations/checkExist");
const uploadCloud = require("../middlewares/upload/cloudinary.config");
const express = require("express");
const {
  register,
  login,
  getAllUser,
  getAllUsers,
  updateImage,
  displayUser,
  editUser,
  deleteUser,
  getDetailUser,
  checkEmailExist,
} = require("../controllers/user.controllers");
const { checkExist } = require("../middlewares/validations/checkExist");
const { authenticate } = require("../middlewares/authen/authenticate");
const { authorize } = require("../middlewares/authen/authorize");

const userRouter = express.Router();

userRouter.post("/register", register);
// userRouter.get("/", getAllUser);
// userRouter.get("/:id", getDetailUser);
// userRouter.put("/:id", checkExist(user), updateUser);
// userRouter.delete("/:id", checkExist(user), deleteUser);
userRouter.post("/login", login);
userRouter.get("/getAllUser", getAllUser);
userRouter.get("/getDetailUser/:id", getDetailUser);
userRouter.get("/manageUsers", displayUser);
userRouter.post("/updateImage/:id", uploadCloud.single("user"), updateImage);

userRouter.put("/editUser/:id", editUser);
userRouter.delete("/deleteUser/:id", deleteUser);

module.exports = {
  userRouter,
  getAllUser,
  displayUser,
  editUser,
  deleteUser,
  getDetailUser,
};
