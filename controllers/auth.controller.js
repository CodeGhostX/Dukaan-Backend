const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "No field should be empty" });
    }
    const userExist = await User.findOne({
      where: {
        email: email,
      },
    });
    if (userExist) {
      return res.status(400).json({ message: "This Email already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    res
      .status(200)
      .json({ message: "User Created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "No Field should be empty" });
    }
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const accessToken = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "10d",
    });
    await User.update(
      { refreshToken: refreshToken },
      {
        where: {
          email: email,
        },
      }
    );
    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", refreshToken)
      .json({
        message: "Sign in Successful",
      });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { signUp, signIn };
