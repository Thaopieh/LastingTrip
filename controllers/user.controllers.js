const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const register = async (req, res) => {
  const { name, email, password, numberPhone, type } = req.body;

  try {
    // Kiểm tra xem email hoặc số điện thoại đã tồn tại hay chưa
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { numberPhone }],
      },
    });

    if (existingUser) {
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
const login = async (req, res) => {
  const { email, password } = req.body;

  // B1: Tìm user dựa trên email
  const user = await User.findOne({ where: { email } });

  if (user) {
    // B2: Kiểm tra mật khẩu có đúng hay không
    const isAuthen = bcrypt.compareSync(password, user.password);

    if (isAuthen) {
      const token = jwt.sign(
        { email: user.email, type: user.type },
        "firewallbase64",
        { expiresIn: 60 * 60 }
      );

      res.status(200).send({
        message: "successful",
        token,
        type: user.type,
        id: user.id,
      });
    } else {
      res
        .status(401)
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
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUsers = await User.findOne({
      where: {
        id,
      },
    });
    await deletedUsers.destroy({ cascade: true });

    res.status(200).send("Successful");
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateImage = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    const updateHotel = await User.findOne({
      where: {
        id,
      },
    });

    if (!updateHotel) {
      return res.status(404).send("User not found");
    }

    const { file } = req;

    if (!file) {
      return res.status(400).send("No file uploaded");
    }

    console.log(file);
    const imagePath = file.path;
    console.log(imagePath);

    updateHotel.url = imagePath;
    await updateHotel.save(); // Sửa từ updateUser thành updateHotel
    res.status(200).send("Successful");
  } catch (error) {
    res.status(500).send(error);
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
  displayUser,
  editUser,
  deleteUser,
  updateImage,
  getDetailUser,
};
