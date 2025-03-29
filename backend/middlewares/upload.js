const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "voter_documents", // Folder name in Cloudinary
      format: file.mimetype.split("/")[1], // Automatically set format
      public_id: `${Date.now()}-${file.originalname}`, // Unique file name
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
