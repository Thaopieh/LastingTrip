const express = require('express');
const urlImageHotel = express.Router();
const {deleteImageMiddleware} = require("../middlewares/upload/delete-image")
const {createUrlImageHotel,getUrlImageHotelById,deleteUrlImageHotel,updateUrlImageHotel} = require('../controllers/urlimagehotel.controller');

// Create a new UrlImageHotel
urlImageHotel.post('/',createUrlImageHotel);

// Get UrlImageHotel by ID
urlImageHotel.get('/', getUrlImageHotelById);
// Update UrlImageHotel by ID
urlImageHotel.put('/:id', updateUrlImageHotel );

// Delete UrlImageHotel by ID
urlImageHotel.delete('/', deleteImageMiddleware,deleteUrlImageHotel);

module.exports = 
{
    urlImageHotel,
}