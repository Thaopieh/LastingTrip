const { User } = require("../models");
const passport = require("passport");
const axios = require("axios");
const session = require("express-session");
// const { checkExist } = require("../middlewares/validations/checkExist");
require("../passport");

// const { checkExist } = require("../middlewares/validations/checkExist");
const uploadCloud = require("../middlewares/upload/cloudinary.config");
const express = require("express");
const {
  register,
  login,
  getAllUser,
  updateImage,
  displayUser,
  editUser,
  deleteUser,
  getDetailUser,
  loginGG,
  // checkEmailExist,
  updatePassword,
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
userRouter.post("/loginGG", loginGG);
userRouter.get("/getAllUser", getAllUser);
userRouter.get("/getDetailUser/:id", getDetailUser);
userRouter.get("/manageUsers", displayUser);
userRouter.post("/updateImage/:id", uploadCloud.single("user"), updateImage);

userRouter.put("/editUser/:id", editUser);
userRouter.put("/updatePassword", updatePassword);

userRouter.delete("/deleteUser/:id", deleteUser);
require("dotenv").config();
userRouter.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Đặt thành true nếu sử dụng HTTPS
  })
);
userRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    session: false,
  })
);

userRouter.get("/auth/google/callback", (req, res, next) => {
  passport.authenticate("google", (error, profile) => {
    let user = profile;
    console.log("profile", profile);
    fetch(`http://localhost:3030/api/v1/users/loginGG`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user.dataValues),
    })
      .then((response) => response.json())
      .then((data) => {
        let userData = {};
        console.log("API response:", data);
        userData = data;
        req.session.data = userData;
        res.redirect(
          `http://localhost:3030/login-success?token=${data.token}&id=${data.id}&name=${data.name}&type=${data.type}`
        );
      })
      .catch((err) => {
        console.error("Error calling API:", err);
        res.status(500).json({ error: "Failed to call login API" });
      });
  })(req, res, next);
});

module.exports = {
  userRouter,
  getAllUser,
  displayUser,
  editUser,
  deleteUser,
  getDetailUser,
  updatePassword,
  loginGG,
};
