const express = require("express");
const {
  create,
  getAllCoupon,
  displayCoupon,
  editCoupon,
  deleteCoupon,
  getDetailCoupon,
  getCouponByCode,
} = require("../controllers/coupons.controllers");

const CouponRouter = express.Router();

CouponRouter.post("/create", create);
CouponRouter.get("/getAllCoupon", getAllCoupon);
CouponRouter.get("/getDetailCoupon/:id", getDetailCoupon);
CouponRouter.get("/manageCoupon", displayCoupon);
CouponRouter.put("/editCoupon/:id", editCoupon);
CouponRouter.delete("/deleteCoupon/:id", deleteCoupon);
CouponRouter.get("/getByCode/:code", getCouponByCode);
module.exports = {
  CouponRouter,
};
