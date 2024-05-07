const express = require("express");
const path = require("path");
const cors = require("cors");
const exphbs = require("express-handlebars");
const { sequelize } = require("./models");
const { rootRouter } = require("./routers");
const app = express();
app.use(cors());

const TeachableMachine = require("@sashido/teachablemachine-node");

const model = new TeachableMachine({
  modelUrl: "https://teachablemachine.withgoogle.com/models/r6BBk-hiN/",
});

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

app.get("/imgClassifier", (req, res) => {
  res.render("User/imgClassifier");
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

app.get("/userInfor", (req, res) => {
  res.render("User/userInfor");
});
app.get("/signin", (req, res) => {
  res.render("User/signin");
});

app.get("/hotel/:id", (req, res) => {
  const hotelId = req.params.id;

  // Call API to get hotel information
  fetch(`http://localhost:3000/api/v1/hotels?id=${hotelId}`)
    .then((response) => response.json())
    .then((data) => {
      // Render Handlebars template and pass data into it
      res.render("User/hotel", { hotel: data });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    });
});
app.get("/sidebar", (req, res) => {
  // Render the sidebar template directly (no need for separate route)
  res.render("sidebar");
});
app.get("/user", (req, res) => {
  // Render the sidebar template directly (no need for separate route)
  res.render("User/user");
});
app.get("/coupons", (req, res) => {
  // Rendecouponsidebar template dir
  res.render("coupons");
});
app.get("/dashboard", (req, res) => {
  res.render("Admin/dashboard");
});
app.get("/admin", (req, res) => {
  res.render("Admin/partials/createHotel");
});


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

// Listen for connection events
app.listen(3000, async () => {
  console.log("App listening on http://localhost:3000");
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
