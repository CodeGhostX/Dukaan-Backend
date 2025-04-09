const express = require("express");
const router = express.Router();
const { addProduct, getAllProducts, getProduct } = require("../controllers/product.controller.js");
const upload = require("../middlewares/multer.middleware.js");

router.post("/add-product", upload.single("image"), addProduct);
router.get("/get-products", getAllProducts);
router.get("/product", getProduct);

module.exports = router;
