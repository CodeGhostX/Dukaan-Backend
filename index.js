const express = require("express");
const sequelize = require("./db");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("test");
});

try {
  const setUpDB = async ()=>{
    await sequelize.authenticate();
    console.log('Connection has been established successfully ✅');
    await sequelize.sync();
    console.log('All Models Synced');
  }
  setUpDB();
  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}