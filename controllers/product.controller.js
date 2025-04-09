const Product = require("../models/product.model.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");

const addProduct = async (req, res) => {
  const { title, price, description, category } = req.body;
  const imageFile = req.file.path;
  const cloudinaryUrl = await uploadOnCloudinary(imageFile);

  const imageLink = cloudinaryUrl.url;
  try {
    const newProduct = await Product.create({
      title,
      price,
      description,
      image: imageLink,
      category,
    });
    res
      .status(200)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addProduct,
};
