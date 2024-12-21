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
          // public_id: `${req.body.name}-${i}`,
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

export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json("Listing not found");
    }
    if (listing.userRef !== req.user.id) {
      return res
        .status(401)
        .json("Unauthorized! You can only delete your own listings!");
    }
    for (let i = 0; i < listing.imageUrls.length; i++) {
      await cloudinary.uploader.destroy(listing.imageUrls[i].public_id);
    }
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message || "Internal Server Error");
  }
};

export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    const newImages = [];
    if (!listing) {
      return res.status(404).json("Listing not found");
    }

    if (listing.userRef !== req.user.id) {
      return res
        .status(401)
        .json("Unauthorized! You can only update your own listings!");
    }
    req.body.imageUrls = JSON.parse(req.body.imageUrls);
    const deleteForImages = listing.imageUrls.filter((image) =>
      req.body.imageUrls.every(
        (newImage) => newImage.public_id !== image.public_id
      )
    );

    for (let i = 0; i < deleteForImages.length; i++) {
      await cloudinary.uploader.destroy(deleteForImages[i].public_id);
    }

    //console.log(req.body.imageUrls);

    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const { public_id, secure_url } = await cloudinary.uploader.upload(
          req.files[i].path,
          {
            folder: "mern-estate-listing",
            overwrite: true,
          }
        );
        newImages.push({ public_id, url: secure_url });
      }
    }
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        imageUrls: [...req.body.imageUrls, ...newImages],
      },
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message || "Internal Server Error");
  }
};

export const getListingWithId = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json("Listing not found");
    }
    res.status(200).json(listing);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message || "Internal Server Error");
  }
};

export const getListings = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const limit = req.query.limit || 9;
    const startIndex = req.query.startIndex || 0;
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }
    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }
    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["rent", "sale"] };
    }
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    res.status(200).json(listings);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message || "Internal Server Error");
  }
};
