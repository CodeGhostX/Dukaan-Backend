const express = require("express");
const sequelize = require("./db");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
const { initSocket } = require("./utils/socket.js");
const productRoutes = require("./routes/product.route.js");
const userRoutes = require("./routes/auth.route.js");

const http = require("http");
const server = http.createServer(app);

const io = initSocket(server);

// io.emit("test", "Test is Successful");

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/product", productRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("test is passed");
});

try {
  const setUpDB = async () => {
    await sequelize.authenticate();
    console.log("DB connection successful ✅");
    await sequelize.sync();
    console.log("All models synced");
  };
  setUpDB();

  server.listen(3000, "0.0.0.0", () => {
    console.log("Server started on port 3000");
  });
} catch (err) {
  console.error("DB connection failed:", err);
}
