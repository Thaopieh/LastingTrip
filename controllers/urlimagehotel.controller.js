const {UrlImageHotel} = require("../models");
const {Op, literal} = require("express");
const createUrlImageHotel = async (req,res) =>
    {
        const {url, HotelId} = req.body;
        try
        {
            const newUrlHotel = await UrlImageHotel.create(
                {
                    url,
                    HotelId,
                }
            )
            res.status(201).send(newUrlHotel);
        }
        catch (error)
        {
            console.log("Error creating UrlHotel:", error);
            res.status(500).send(error);
        }
    }

    const getUrlImageHotelById = async (req, res) => {
      const { HotelId } = req.query; // Lấy hotelId từ URL parameter
      try {
          // Tìm tất cả các đường dẫn ảnh có HotelId tương ứng
          const urls = await UrlImageHotel.findAll({ where: { HotelId: HotelId } });
          if (!urls || urls.length === 0) {
              return res.status(404).json({ error: 'No image URLs found for this hotelId' });
          }
  
          // Tạo danh sách mới chứa thông tin hình ảnh bao gồm id
          const imageList = urls.map(image => {
              // Xử lý chuỗi URL để loại bỏ các ký tự không mong muốn
              const processedUrl = image.url.replace(/\\/g, '/'); // Thay thế tất cả các ký tự \\ bằng /
              return {
                  id: image.id, // ID của ảnh
                  url: processedUrl // Đường dẫn ảnh đã được xử lý
              };
          });
  
          // Trả về danh sách các đường dẫn ảnh với id
          res.status(200).json(imageList);
      } catch (error) {
          console.error('Error fetching image URLs:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  };
  
      
      const updateUrlImageHotel = async (req, res) => {
        const { id } = req.params;
        const { url, HotelId } = req.body;
      
        try {
          const urlHotel = await UrlImageHotel.findByPk(id);
          if (!urlHotel) {
            return res.status(404).json({ error: 'UrlHotel not found' });
          }
          await urlHotel.update({ url, HotelId });
          res.status(200).json(urlHotel);
        } catch (error) {
          console.error('Error updating UrlHotel:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };
      
      const deleteUrlImageHotel = async (req, res) => {
        const { id} = req.query;
      
        try {
          // Tìm bản ghi UrlImageHotel với id và url tương ứng
          await UrlImageHotel.destroy({
            where: {
              id: id
            }
          });
          
          // Phản hồi với mã trạng thái 204 để chỉ ra xóa thành công
          res.status(200).send("xoa thanh cong");
        } catch (error) {
          console.error('Error deleting UrlHotel:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };
      
      
      module.exports = {
        createUrlImageHotel,
        getUrlImageHotelById,
        updateUrlImageHotel,
        deleteUrlImageHotel
      };