import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: "User already registered!" });
    }
    const hashedPwd = bcryptjs.hashSync(password, 10);
    const newUser = new User({ email, username, password: hashedPwd });
    await newUser.save();
    return res
      .status(201)
      .json({ user: newUser, message: "Signup successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
    //next(error);
  }
};

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required!" });
    } else if (!password) {
      return res.status(400).json({ message: "Password is required!" });
    }
    const validateUser = await User.findOne({ email });
    if (!validateUser) {
      return res.status(404).json({ message: "User not registered!" });
    }
    const isCorrectPwd = bcryptjs.compareSync(password, validateUser.password);
    if (!isCorrectPwd) {
      return res.status(401).json({ message: "Incorrect Credentials" });
    }
    const token = jwt.sign({ id: validateUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res
      .cookie("access_token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .status(200)
      .json({ ...validateUser._doc, password: null });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
