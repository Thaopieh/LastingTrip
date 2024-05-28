const fs = require("fs");
const path = require("path");
const { URL } = require("url"); // Sử dụng module URL trong Node.js
const middlewareDirectory = __dirname;
// Đường dẫn của thư mục chứa public (nằm ở cùng cấp với thư mục middleware)
const publicDirectory = path.resolve(middlewareDirectory, "../..", "public"); // Đường dẫn tới thư mục chứa hình ảnh
console.log(publicDirectory);
// Middleware để xóa file hình ảnh
const deleteImageMiddleware = (req, res, next) => {
  try {
    const imageUrl = req.body.url; // Lấy URL của file hình ảnh từ body của yêu cầu
    console.log(imageUrl);
    // Kiểm tra và xử lý URL hợp lệ
    if (!imageUrl) {
      return res.status(400).send("Thiếu thông tin URL của file hình ảnh");
    }

    // Sử dụng module URL để phân tích URL và lấy đường dẫn tệp
    const urlObject = new URL(imageUrl);
    console.log(urlObject);
    const imagePath = imageUrl.split("http://localhost:3030/")[1];
    // Lấy đường dẫn tệp sau domain
    console.log(imagePath);
    // Xác định đường dẫn tuyệt đối của file hình ảnh
    const absoluteImagePath = path.join(publicDirectory, imagePath);
    console.log(absoluteImagePath);
    // Kiểm tra xem file có tồn tại hay không
    if (fs.existsSync(absoluteImagePath)) {
      // Nếu file tồn tại, thực hiện xóa file
      fs.unlink(absoluteImagePath, (err) => {
        if (err) {
          console.error("Lỗi khi xóa file:", err);
          res.status(500).send("Đã xảy ra lỗi khi xóa file");
        } else {
          console.log("Đã xóa file thành công:", imagePath);
          return next();
        }
      });
    } else {
      // Nếu file không tồn tại, trả về mã lỗi 404
      console.log("Không có ảnh");
      res.status(404).send("File hình ảnh không tồn tại");
    }
  } catch (error) {
    console.error(
      "Lỗi trong quá trình xử lý middleware deleteImageMiddleware:",
      error
    );
    res.status(500).send("Đã xảy ra lỗi trong quá trình xử lý middleware");
  }
};

// Xuất middleware như một module để có thể sử dụng trong các tệp khác
module.exports = {
  deleteImageMiddleware,
};
