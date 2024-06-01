const { Reviews, Hotels, User } = require("../models");
const { Op } = require("sequelize");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const createReview = async (req, res) => {
  try {
    const { rating, description, hotelId, guestId } = req.body;

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
    console.log(file);
    if (file) {
      const imagePath = file.path;
      newReviewData.file = imagePath;
    }

    const newReview = await Reviews.create(newReviewData);
    console.log(newReviewData);

    res.status(201).send(newReview);
  } catch (error) {
    res.status(500).send(error);
  }
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
          attributes: ["name", "url"],
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
      guestAvatar: review.User.url,
    }));

    res.status(200).json(reviewsWithInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getFullReview = async (req, res) => {
  try {
    const hotelList = await Reviews.findAll();
    res.status(200).json(hotelList);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
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
    const deletedReview = await Reviews.findOne({
      where: {
        id,
      },
    });
    await deletedReview.destroy({ cascade: true });

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
  getFullReview,
};
