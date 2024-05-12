const mkdirp = require("mkdirp");
const multer = require("multer");

const uploadImage2 = (type, maxCount) => {
  // Create the directory if it doesn't exist
  mkdirp.sync(`./public/image/${type}`);

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/image/${type}`);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
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
        cb(new Error("Invalid file extension"));
      }
    },
  });

  return upload.array(type, maxCount);
};

module.exports = {
  uploadImage2,
};