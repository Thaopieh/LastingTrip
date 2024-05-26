const { UrlImageHotel } = require("../models");
const { Op, literal } = require("express");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const createUrlImageHotel = async (req, res) => {
  try {
    const { HotelId } = req.body;
    const { files } = req;
    console.log(files);
    // Iterate over each file and create a corresponding UrlImageHotel record
    for (const file of files) {
      const imagePath = file.path;
      const name = file.filename;

      // Create UrlImageHotel record associated with the new hotel
      const imageUrlRecord = await UrlImageHotel.create({
        url: imagePath,
        file_name: name,
        HotelId: HotelId,
      });
    }
    res.status(201).send("successful");
  } catch (error) {
    console.log("Error creating UrlHotel:", error);
    res.status(500).send(error);
  }
};

const getUrlImageHotelById = async (req, res) => {
  const { HotelId } = req.query; // Lấy hotelId từ URL parameter
  try {
    // Tìm tất cả các đường dẫn ảnh có HotelId tương ứng
    const urls = await UrlImageHotel.findAll({ where: { HotelId: HotelId } });
    if (!urls || urls.length === 0) {
      return res
        .status(404)
        .json({ error: "No image URLs found for this hotelId" });
    }

    // Tạo danh sách mới chứa thông tin hình ảnh bao gồm id
    const imageList = urls.map((image) => {
      // Xử lý chuỗi URL để loại bỏ các ký tự không mong muốn
      const processedUrl = image.url.replace(/\\/g, "/"); // Thay thế tất cả các ký tự \\ bằng /
      return {
        id: image.id, // ID của ảnh
        url: processedUrl, // Đường dẫn ảnh đã được xử lý
      };
    });

    // Trả về danh sách các đường dẫn ảnh với id
    res.status(200).json(imageList);
  } catch (error) {
    console.error("Error fetching image URLs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUrlImageHotel = async (req, res) => {
  const { id } = req.params;
  const { url, HotelId } = req.body;

  try {
    const urlHotel = await UrlImageHotel.findByPk(id);
    if (!urlHotel) {
      return res.status(404).json({ error: "UrlHotel not found" });
    }
    await urlHotel.update({ url, HotelId });
    res.status(200).json(urlHotel);
  } catch (error) {
    console.error("Error updating UrlHotel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteUrlImageHotel = async (req, res) => {
  const { id } = req.params;

  try {
    // Tìm ảnh cần xóa dựa trên imageId
    const imageToDelete = await UrlImageHotel.findByPk(id);

    if (!imageToDelete) {
      return res.status(404).json({ error: "Không tìm thấy ảnh để xóa" });
    }

    // Xóa ảnh từ Cloudinary
    await cloudinary.uploader.destroy(imageToDelete.file_name);

    // Xóa bản ghi ảnh từ cơ sở dữ liệu
    await imageToDelete.destroy();

    // Phản hồi với thông báo xóa thành công
    res.status(200).send("Xóa ảnh thành công");
  } catch (error) {
    console.error("Lỗi khi xóa ảnh:", error);
    res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
};

const getAllUrlImageHotel = async (req, res) => {
  try {
    const urlImageHotels = await UrlImageHotel.findAll();

    if (!urlImageHotels || urlImageHotels.length === 0) {
      return res.status(404).json({ error: "No UrlImageHotel records found" });
    }

    res.status(200).json(urlImageHotels);
  } catch (error) {
    console.error("Error fetching UrlImageHotel records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUrlImageHotel,
  createUrlImageHotel,
  getUrlImageHotelById,
  updateUrlImageHotel,
  deleteUrlImageHotel,
};
