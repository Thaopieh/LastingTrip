const { Reviews, Hotels, User } = require("../models");
const { Op } = require("sequelize");
const createReview = async (req, res) => {
  try {
    const { rating, description, hotelId, guestId } = req.body;
    console.log("Đánh giá: " + rating);
    console.log(typeof rating);
    console.log("Nội dung: " + description);
    console.log(typeof description);

    console.log("user-id " + guestId);
    console.log(typeof guestId);

    console.log("hotel id " + hotelId);
    console.log(typeof hotelId);

    if (!guestId || !hotelId || rating === undefined || !description) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    let newReviewData = {
      rating,
      description,
      hotelId,
      guestId,
    };

    const { file } = req;
    if (file) {
      const imagePath = file.path;
      var cleanedPath = imagePath.replace(/^public/, "");
      const urlImage = `localhost:3030${cleanedPath}`;
      newReviewData.file = urlImage;
    }

    const newReview = await Reviews.create(newReviewData);

    res.status(201).send(newReview);
  } catch (error) {
    res.status(500).send(error);
  }
};

const uploadFile = async (req, res) => {
  const { file } = req;
  const imagePath = file.path;
  var cleanedPath = imagePath.replace(/^public/, "");
  const urlImage = `localhost:3030${cleanedPath}`;
  const { user } = req;
  const commentFound = await Reviews.findOne({
    id: user.id,
  });
  commentFound.file = urlImage;
  await commentFound.save();
  res.send(commentFound);
};

const getAllReview = async (req, res) => {
  const { hotelId } = req.query;

  try {
    const reviews = await Reviews.findAll({
      where: { hotelId },
      include: [
        {
          model: Hotels,
          attributes: ["name"],
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ error: "No reviews found for this hotel" });
    }

    const reviewsWithInfo = reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      description: review.description,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      hotelId: review.hotelId,
      hotelName: review.Hotel.name,
      guestId: review.guestId,
      guestName: review.User.name,
    }));

    res.status(200).json(reviewsWithInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
const getDetailReview = async (req, res) => {
  const { id } = req.params;
  try {
    const detailReview = await Reviews.findOne({
      where: {
        id,
      },
    });
    res.status(200).send(detailReview);
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateReview = async (req, res) => {
  const { id } = req.params;
  const { name, status, price, quantity, quantity_people, type_bed } = req.body;
  try {
    const detailReview = await Reviews.findOne({
      where: {
        id,
      },
    });
    detailReview.name = name;
    detailReview.address = address;
    detailReview.star = star;
    detailReview.price = price;
    await detailReview.save();
    res.status(200).send(detailReview);
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    Review.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Successful");
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  createReview,
  deleteReview,
  updateReview,
  getDetailReview,
  getAllReview,
  uploadFile,
};
