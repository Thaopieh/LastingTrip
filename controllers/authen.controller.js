const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
      res.status(200).send({ message: "successful", token, type: user.type,id: user.id });
    } else {
      res
        .status(500)
        .send({ message: "dang nhap that bai, kiem tra lai mat khau" });
    }
  } else {
    res.status(404).send({ message: "khong co nguoi dung nay" });
  }
};
module.exports =
{
  login,
  register
};