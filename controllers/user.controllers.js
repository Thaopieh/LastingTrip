const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const register = async (req, res) => {
  const { name, email, password, numberPhone, type } = req.body;

  try {
    // Kiểm tra xem email hoặc số điện thoại đã tồn tại hay chưa
    const checkExistsResponse = await fetch(
      "http://localhost:3030/api/v1/users/checkEmailPhoneExists",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, numberPhone }),
      }
    );

    const checkExistsResult = await checkExistsResponse.json();

    if (checkExistsResult.exists) {
      // Nếu email hoặc số điện thoại đã tồn tại
      return res
        .status(400)
        .json({ error: "Email or phone number already exists" });
    }

    // Nếu không tồn tại, tiến hành tạo người dùng mới
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      numberPhone,
      type,
    });

    return res.status(201).send(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const checkEmailExist = async (req, res) => {
  const { email, numberPhone } = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { numberPhone }],
      },
    });

    if (existingUser) {
      // Nếu email hoặc số điện thoại đã tồn tại trong cơ sở dữ liệu
      return res.status(200).json({ exists: true });
    }

    // Nếu không tồn tại
    return res.status(200).json({ exists: false });
  } catch (error) {
    console.error("Error checking email and phone:", error);
    return res.status(500).json({ error: "Internal Server Error" });
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

const getAllUser = async (req, res) => {
  const { name } = req.query;
  // console.log(data);
  try {
    if (name) {
      const UserList = await User.findAll({
        where: {
          name: {
            numberPhone,
            email,
          },
        },
      });
      res.status(200).send(UserList);
    } else {
      const UserList = await User.findAll();
      res.status(200).send(UserList);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const displayUser = async (req, res) => {
  {
    try {
      const users = await User.findAll({ raw: true });
      res.render("user", { datatable: users });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
};
const editUser = async (req, res) => {
  console.log("10");
  try {
    const userId = req.params.id;
    const { name, email, numberPhone, type } = req.body;
    const detailUser = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!detailUser) {
      res.status(400).send({
        status: `error`,
        message: `User with id ${id}  not found`,
      });
    }
    if (name) detailUser.name = name;
    if (email) detailUser.email = email; // Chỉnh sửa tại đây
    if (numberPhone) detailUser.numberPhone = numberPhone;
    if (type) detailUser.type = type;
    const updateUser = await detailUser.save();
    if (!updateUser)
      res.status(400).send({
        error: `error`,
        message: `Data fail to ${id} update`,
      });
    res.status(200).send({ updateUser }); // Gửi lại detailUser sau khi đã cập nhật thành công
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteUser = (req, res) => {
  try {
    const userId = req.params.id;
    User.destroy({ where: { id: userId } });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getDetailUser = async (req, res) => {
  console.log("3");
  try {
    const detailHotel = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send(detailHotel);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  register,
  login,
  getAllUser,
  getAllUser,
  displayUser,
  editUser,
  deleteUser,
  getDetailUser,
  checkEmailExist,
};
