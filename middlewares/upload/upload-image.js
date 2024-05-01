const multer = require("multer");
const uploadImage = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/image/comment-file"); // setup cho can luu file
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // dat lai ten cho file
    },
  });
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const extensionIMG = [".png", ".jpg"];
      const extension = file.originalname.slice(-4);
      const check = extensionIMG.includes(extension);
      if (check) {
        cb(null, true);
      } else {
        cb(new Error("extension not invalid!"));
      }
    },
  });
  return upload.single("file");
};

module.exports = {
  uploadImage,
};
