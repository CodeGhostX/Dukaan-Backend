const express = require("express");
const sequelize = require("./db");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("test");
});

const startProject = async () => {
  try {
    await sequelize.authenticate;
    console.log('Connection has been established successfully ✅');
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startProject();

