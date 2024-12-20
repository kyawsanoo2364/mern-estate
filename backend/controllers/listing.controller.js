import Listing from "../models/listing.model.js";
import cloudinary from "../utils/Cloudinary.js";

export const createListing = async (req, res) => {
  try {
    if (!req.files && req.files.length <= 0) {
      return res.status(400).json("Please upload at least one image");
    }
    if (req.body.regularPrice < req.body.discountPrice) {
      return res
        .status(400)
        .json("Discount price cannot be greater than regular price");
    }
    const images = req.files.map((file) => file.path);
    let imagesArray = [];
    for (let i = 0; i < images.length; i++) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        images[i],
        {
          folder: "mern-estate-listing",
          overwrite: true,
          public_id: `${req.body.name}-${i}`,
        }
      );
      imagesArray.push({ public_id, url: secure_url });
    }
    const newListing = await Listing.create({
      ...req.body,
      imageUrls: imagesArray,
      userRef: req.user.id,
    });
    res.status(201).json(newListing);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const getUserListings = async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized! You can only manage your own listings!",
      });
    }
    const listings = await Listing.find({ userRef: req.params.id });
    res.status(200).json(listings);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message || "Internal Server Error");
  }
};
