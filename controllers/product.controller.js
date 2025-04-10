const Product = require("../models/product.model.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const { getIo } = require("../utils/socket.js");

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
    const io = getIo();
    io.emit("productAdded", newProduct);
    res
      .status(200)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllProducts = async (_, res) => {
  try {
    const allProducts = await Product.findAll();
    res.status(200).json({ message: "All Products", data: allProducts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ message: "Id is not provided" });
    }
    const product = await Product.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProduct,
};
