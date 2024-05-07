const express = require('express');
const urlImageRoom = express.Router();
const {uploadImage2} = require ("../middlewares/upload/upload-mutileImage.js")
const {deleteImageMiddleware} = require("../middlewares/upload/delete-image.js")
const {createUrlImageRoom,getUrlImageRoomById,updateUrlImageRoom,deleteUrlImageRoom}= require('../controllers/urlImageRoom.controller.js');

// Create a new UrlImageHotel
urlImageRoom.post('/',uploadImage2("room",10) , createUrlImageRoom);

// Get UrlImageHotel by ID
urlImageRoom.get('/:id', getUrlImageRoomById);

// Update UrlImageHotel by ID
urlImageRoom.put('/:id',uploadImage2("room",10),updateUrlImageRoom);

// Delete UrlImageHotel by ID
urlImageRoom.delete('/',deleteImageMiddleware,deleteUrlImageRoom);

module.exports = 
{
    urlImageRoom,
}
