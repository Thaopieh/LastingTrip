const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authen.controller");

const authenRouter = express.Router();

authenRouter.post("/register", register);
// userRouter.get("/", getAllUser);
// userRouter.get("/:id", getDetailUser);
// userRouter.put("/:id", checkExist(user), updateUser);
// userRouter.delete("/:id", checkExist(user), deleteUser);
authenRouter.post("/login", login);
authenRouter.post("/forgotpassword", forgotPassword);
authenRouter.post("/resetpassword", resetPassword);

module.exports = {
  authenRouter,
};
