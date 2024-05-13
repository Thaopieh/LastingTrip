const mkdirp = require("mkdirp");
const multer = require("multer");

const uploadImage = (type) => {
  const made = mkdirp.sync(`./public/image/${type}`);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/image/${type}`); // setup chổ cần lưu file
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname); // đặt lại tên cho file
    },
  });
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      const extensionImageList = [".png", ".jpg", ".jpeg"];
      const extension1 = file.originalname.slice(-4);
      const extension2 = file.originalname.slice(-5);
      const check =
        extensionImageList.includes(extension1) ||
        extensionImageList.includes(extension2);
      if (check) {
        cb(null, true);
      } else {
        cb(new Error("extension không hợp lệ"));
      }
    },
  });

  return upload.single(type);
};

module.exports = {
  uploadImage,
};
