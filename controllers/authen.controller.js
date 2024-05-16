const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const register = async (req, res) => {
  const { name, email, password, numberPhone } = req.body;
  try {
    // tao ra mot chuoi ngau nhien
    const salt = bcrypt.genSaltSync(10);
    // ma hoa chuoi salt + password
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      numberPhone,
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  // b1 tìm user dựa trên email
  // b2 kiểm tra mật khẩu có đúng hay không
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    const token = jwt.sign(
      { email: user.email, type: user.type },
      "firewallbase64",
      { expiresIn: 60 * 60 }
    );
    const isAuthen = bcrypt.compareSync(password, user.password);
    if (isAuthen) {
      res
        .status(200)
        .send({ message: "successful", token, type: user.type, id: user.id });
    } else {
      res
        .status(500)
        .send({ message: "dang nhap that bai, kiem tra lai mat khau" });
    }
  } else {
    res.status(404).send({ message: "khong co nguoi dung nay" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send email with reset password link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Password Reset Request",
      text: `Your password reset token is: ${token}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newpassword } = req.body;
  console.log("new passs", newpassword);

  if (!newpassword) {
    return res.status(400).json({ message: "New password is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    // Reset password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(newpassword, salt);
    user.password = hashPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
};
