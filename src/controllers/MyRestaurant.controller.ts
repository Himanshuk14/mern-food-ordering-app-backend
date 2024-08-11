import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import Restaurant from "../models/MyRestaurant.model";
import { uploadOnCloudinary } from "../utils/cloudinary";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError";

const createMyRestaurant = asyncHandler(async (req: Request, res: Response) => {
  const exisitingRestaurant = await Restaurant.findOne({ user: req.userId });
  if (exisitingRestaurant) {
    return res.status(409).json({ message: "Restaurant already exists" });
  }
  const image = req.file as Express.Multer.File;

  const uploadResponse = await uploadOnCloudinary(image.path);
  if (!uploadResponse) {
    throw new ApiError(500, "Image upload failed");
  }

  const restaurant = new Restaurant(req.body);
  restaurant.imageUrl = uploadResponse.url;
  restaurant.user = new mongoose.Types.ObjectId(req.userId);

  restaurant.lastUpdated = new Date();
  await restaurant.save();
  res.status(201).json(restaurant.toObject());
});

export { createMyRestaurant };
