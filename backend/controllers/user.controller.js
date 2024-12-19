import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import cloudinary from "../utils/Cloudinary.js";

export const testUserApi = async (req, res) => {
  try {
    res.json({ message: "Test User Api Route" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "500 - Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized! You can only manage your own account!",
      });
    }
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    let imageUrl;
    const user = await User.findById(req.params.id);
    if (req.file) {
      //cloudinary
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        req.file.path,
        {
          public_id: user.email,
          resource_type: "image",
          folder: "mern-estate-user-profile",
          overwrite: true,
          unique_filename: true,
        }
      );
      imageUrl = secure_url;
    } else {
      imageUrl = user.avatar;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: imageUrl,
        },
      },
      { new: true }
    );
    const { password: pass, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res
        .status(401)
        .json({ message: "You can only delete your own account!" });
    }
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
