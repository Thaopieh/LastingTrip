const { Coupons } = require("../models");
const user = require("../models/coupons");
const create = async (req, res) => {
  const { code, percent, begin, end } = req.body;
  try {
    // tao ra mot chuoi ngau nhien
    // ma hoa chuoi salt + password
    const newCoupon = await Coupons.create({
      code,
      percent,
      begin,
      end,
    });
    res.status(201).send(newCoupon);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllCoupon = async (req, res) => {
  try {
    const couponList = await Coupons.findAll();
    res.status(200).json(couponList);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const displayCoupon = async (req, res) => {
  try {
    const coupon = await Coupons.findAll({ raw: true });
    res.render("coupons", { datatable: coupon });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const editCoupon = async (req, res) => {
  console.log("10");
  try {
    const couponId = req.params.id;
    const { code, percent, start, end } = req.body;
    const detailCoupon = await Coupons.findOne({
      where: {
        id: couponId,
      },
    });
    if (!detailCoupon) {
      res.status(400).send({
        status: `error`,
        message: `User with id ${id}  not found`,
      });
    }
    if (code) detailCoupon.code = code;
    if (percent) detailCoupon.percent = percent; // Chỉnh sửa tại đây
    if (start) detailCoupon.start = start;
    if (end) detailCoupon.end = end;
    const updateCoupon = await detailCoupon.save();
    if (!updateCoupon)
      res.status(400).send({
        error: `error`,
        message: `Data fail to ${id} update`,
      });
    res.status(200).send({ updateCoupon }); // Gửi lại detailUser sau khi đã cập nhật thành công
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteCoupon = (req, res) => {
  try {
    const couponId = req.params.id;
    Coupons.destroy({ where: { id: couponId } });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getDetailCoupon = async (req, res) => {
  console.log("3");
  try {
    const detailCoupon = await Coupons.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send(detailCoupon);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCouponByCode = async (req, res) => {
  try {
    const couponCode = req.params.code;
    const coupon = await Coupons.findOne({
      where: {
        code: couponCode,
      },
    });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
  getAllCoupon,
  displayCoupon,
  editCoupon,
  deleteCoupon,
  getDetailCoupon,
  getCouponByCode,
};
