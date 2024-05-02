
const express = require("express");
const { stationRouter } = require("./station.routers");
const { userRouter } = require("./user.routers");
const { HotelRouter } = require("./hotel.routerss");
const { roomRouter } = require("./room.routes");
const { CouponRouter } = require("./coupon.routers");
const { AmenityRouter } = require("./amenity.routers");
const { ReviewRouter } = require("./review.routers");
const { HotelAmenityRouter } = require("./hotelAmenities.router");
const { RoomAmenityRouter } = require("./roomService.router");
const { authenRouter } = require("./authen.routers");
const { chatbotAl} = require("./chatbotal.routers")
const rootRouter = express.Router();

rootRouter.use("/stations", stationRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/hotels", HotelRouter);
rootRouter.use("/rooms", roomRouter);
rootRouter.use("/coupons", CouponRouter);
rootRouter.use("/amenities", AmenityRouter);
rootRouter.use("/reviews", ReviewRouter);
rootRouter.use("/hotelAmenities", HotelAmenityRouter);
rootRouter.use("/authen",authenRouter);
rootRouter.use("/room", RoomAmenityRouter);
rootRouter.use("/chatbotAl", chatbotAl);
module.exports = {
  rootRouter,
};