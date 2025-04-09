const express = require("express");
const sequelize = require("./db");
const app = express();
const PORT = 3000;
const productRoutes = require("./routes/product.route.js");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/product", productRoutes);

app.get("/", (req, res) => {
  res.send("test");
});

try {
  const setUpDB = async () => {
    await sequelize.authenticate();
    console.log("Connection has been established successfully ✅");
    await sequelize.sync();
    console.log("All Models Synced");
  };
  setUpDB();
  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
