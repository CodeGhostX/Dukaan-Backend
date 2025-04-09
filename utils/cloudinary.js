const { v2: cloudinary } = require("cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: "dpnzyclmk",
  api_key: "787873694113312",
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadOnCloudinary = async (localPath) => {
  const uploadResult = await cloudinary.uploader
    .upload(localPath, {
      resource_type: "auto",
    })
    .catch((error) => {
      console.log(error);
    });
  return uploadResult;
};

module.exports = uploadOnCloudinary;
