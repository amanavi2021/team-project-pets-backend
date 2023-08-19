const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine the folder based on file properties or request data
    let folder;
    if (file.fieldname === 'avatarURL') {
      folder = 'users';
    } else {
      folder = 'pets';
    }
    console.log(file.originalname);
    return {
      folder: folder,
      allowed_formats: ["jpg", "png", "webp"], // Adjust the allowed formats as needed
      filename: file.originalname,
    };
  },
});

const upload =  multer({storage});

module.exports = upload;
