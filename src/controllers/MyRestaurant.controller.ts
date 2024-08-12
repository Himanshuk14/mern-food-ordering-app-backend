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

const getMyRestaurant = asyncHandler(async (req: Request, res: Response) => {
  const restaurant = await Restaurant.findOne({ user: req.userId });
  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }
  res.status(200).json(restaurant.toObject());
});

const updateMyRestaurant = asyncHandler(async (req: Request, res: Response) => {
  const restaurant = await Restaurant.findOne({ user: req.userId });
  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }
  restaurant.restaurantName = req.body.restaurantName;
  restaurant.city = req.body.city;
  restaurant.country = req.body.country;
  restaurant.deliveryPrice = req.body.deliveryPrice;
  restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
  restaurant.cuisines = req.body.cuisines;
  restaurant.menuItems = req.body.menuItems;
  restaurant.lastUpdated = new Date();

  if (req.file) {
    const image = req.file as Express.Multer.File;
    const uploadResponse = await uploadOnCloudinary(image.path);
    if (!uploadResponse) {
      throw new ApiError(500, "Image upload failed");
    }
    restaurant.imageUrl = uploadResponse.url;
  }

  await restaurant.save();
  res.status(200).json(restaurant.toObject());
});

export { createMyRestaurant, getMyRestaurant, updateMyRestaurant };
