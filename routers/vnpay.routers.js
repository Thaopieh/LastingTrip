const { Booking } = require("../models");
const express = require("express");
const {
    createPaymentUrl,
    vnpayReturn
} = require("../controllers/vnpay.controller");

const vnpayRouter = express.Router();
vnpayRouter.post("/create-vnpay-url", createPaymentUrl);
vnpayRouter.get("/vnpay_return",vnpayReturn);

module.exports = {
    vnpayRouter,
}