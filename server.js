const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const exphbs = require("express-handlebars");
const { sequelize } = require("./models");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var store = require("store");
var LocalStorage = require("node-localstorage").LocalStorage;

require("./passport");
const { rootRouter } = require("./routers");
const { User } = require("./models/user");
const { access } = require("fs");
var ls = require("local-storage");

require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ extended: true }));
app.use(express.urlencoded());
app.use(
  session({
    secret: process.env.SECRET_KEY, // Sử dụng khóa bí mật từ biến môi trường hoặc một khóa mặc định
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Đặt thành true nếu sử dụng HTTPS
  })
);

app.get("/image/classify", async (req, res) => {
  const { url } = req.query;

  return model
    .classify({
      imageUrl: url,
    })
    .then((predictions) => {
      console.log(predictions);
      return res.json(predictions);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send("Something went wrong!");
    });
});

// Setup JSON parsing
app.use(express.json());

const publicPathDirectory = path.join(__dirname, "./public");
app.use(express.static(publicPathDirectory));
// Use routers
app.use("/api/v1", rootRouter);

// Define routes
app.get("/", (req, res) => {
  res.render("User/mainpage");
});

app.get("/chatbotimage", (req, res) => {
  res.render("User/chatbotImage");
});
app.get("/chatbot", (req, res) => {
  res.render("User/chatbot");
});

app.get("/hotelList", (req, res) => {
  res.render("User/hotelList");
});

app.get("/supplier", (req, res) => {
  res.render("User/supplier");
});

app.get("/register", (req, res) => {
  res.render("User/register");
});

app.get("/aboutUs", (req, res) => {
  res.render("User/aboutUs");
});

app.get("/userInfo", (req, res) => {
  res.render("User/userInfo");
});
app.get("/signin", (req, res) => {
  res.render("User/signin");
});

app.get("/user", (req, res) => {
  // Render the sidebar template directly (no need for separate route)
  res.render("User/user");
});
app.get("/payment", (req, res) => {
  res.render("User/payment");
});
app.get("/paymentmethod", (req, res) => {
  res.render("User/paymentMethod");
});
app.get("/result", (req, res) => {
  res.render("User/result");
});
app.get("/resultTT", (req, res) => {
  res.render("User/resultTT");
});
app.get("/coupons", (req, res) => {
  // Rendecouponsidebar template dir
  res.render("coupons");
});
app.get("/dashboard", (req, res) => {
  res.render("Admin/dashboard");
});

app.get("/agentInfo", (req, res) => {
  res.render("User/agentInfo");
});
app.get("/ManageRoom/:id", (req, res) => {
  var hotelId = req.params.id;
  res.render("Admin/partials/room", { roomId: hotelId });
});
app.get("/ManageHotelService/:id", (req, res) => {
  var hotelId = req.params.id;
  res.render("Admin/partials/HotelService", { id: hotelId });
});

app.get("/myBooking", (req, res) => {
  res.render("User/myBooking");
});

app.get("/ManageRoomService/:id", (req, res) => {
  var roomId = req.params.id;
  res.render("Admin/partials/RoomService", { id: roomId });
});

function ChangeToSlug(title) {
  var slug;
  slug = title.toLowerCase();
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  slug = slug.replace(/ /gi, "-");
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");
  slug = slug.trim();
  return slug;
}

function findHotelBySlug(slug) {
  return fetch("http://localhost:3030/api/v1/hotels/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Lỗi khi gọi API");
      }
      return response.json();
    })
    .then((hotels) => {
      // Tìm khách sạn với slug tương ứng trong danh sách
      const hotel = hotels.find((hotel) => ChangeToSlug(hotel.name) == slug);
      return hotel;
    })
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      throw error;
    });
}

app.get("/hotel/:slug/:id", (req, res) => {
  var slug = req.params.slug;
  var hotel = findHotelBySlug(slug);

  if (hotel) {
    var hotelId = hotel.id;
    console.log(hotelId);
    res.render("User/hotel");
  } else {
    alert("loi");
  }
});

// app.get("/userInfo/:id", (req, res) => {
//   var id = req.params.id;
//   res.render("User/userInfor", { id: id });
// });

app.get("/userInfor", (req, res) => {
  res.render("User/userInfor");
});

// app.get("/admin", (req, res) => {
//   res.render("Admin/partials/createHotel");
// });

// app.get("/admin/hotel", (req, res) => {
//   res.render("Admin/partials/agent");
// });
app.get("/admin/addHotel", (req, res) => {
  res.render("Admin/partials/agentForm");
});
app.get("/agent/addHotel", (req, res) => {
  res.render("Admin/partials/agentForm");
});
// app.get("/admin/Hotel/Service", (req, res) => {
//   res.render("Admin/partials/HotelService");
// });
// app.get("/admin/room/service", (req, res) => {
//   res.render("Admin/partials/RoomService");
// });
// app.get("/admin/room/", (req, res) => {
//   res.render("Admin/partials/room");
// });
// app.get("/BookingRoom", (req, res) => {
//   res.render("Admin/partials/Booking");
// });

app.get("/ForgotPass", (req, res) => {
  res.render("User/forgotPass");
});

app.get("/resetpassword", (req, res) => {
  res.render("user/resetPass");
});
app.get("/login-success", (req, res) => {
  res.render("user/loginSuccess");
});
app.use(passport.initialize());
app.use(passport.session());
// Configure Handlebars
const hbs = exphbs.create({
  extname: "hbs",
  defaultLayout: false,
  partialsDir: [
    __dirname + "/views/User/partials",
    __dirname + "/views/Admin/partials",
  ],
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

const port = process.env.PORT || 3030; // Sử dụng port mặc định là 3030 nếu không có biến môi trường PORT

// app.get("/hotel/:id", (req, res) => {
//   const hotelId = req.params.id;

//   // Call API to get hotel information
//   fetch(`http://localhost:${port}/api/v1/hotels?id=${hotelId}`)
//     .then((response) => response.json())
//     .then((data) => {
//       // Render Handlebars template and pass data into it
//       res.render("User/hotel", { hotel: data });
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       res.status(500).send("Internal Server Error");
//     });
// });

// Listen for connection events
app.listen(port, async () => {
  console.log("App listening on http://localhost:3030");
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
