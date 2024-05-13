const express = require("express");
const {
    create,
    getAllCoupon,
    displayCoupon,
    editCoupon,
    deleteCoupon,
    getDetailCoupon
} = require("../controllers/coupons.controllers");

const CouponRouter = express.Router();

CouponRouter.post("/create", create);
CouponRouter.get("/getAllCoupon", getAllCoupon);
CouponRouter.get("/getDetailCoupon/:id", getDetailCoupon);
CouponRouter.get("/manageCoupon", displayCoupon);
CouponRouter.put("/editCoupon/:id", editCoupon);
CouponRouter.delete("/deleteCoupon/:id", deleteCoupon);
module.exports = {
    CouponRouter,
};
