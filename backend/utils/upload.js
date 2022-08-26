const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "img",
    format: (req, file) => {'jpg', 'jpeg', 'png'},
    public_id: (req, file, cb) => (Date.now() + "--" + file.originalname)
  },
});

const upload = multer({
  storage: storage,
});

module.exports = { upload };
