import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

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
    next(error);
  }
};
