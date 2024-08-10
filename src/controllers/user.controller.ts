import { Request, Response } from "express";
import User from "../models/users.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { auth0Id } = req.body;
  const exisingUser = await User.findOne({ auth0Id });
  if (exisingUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = new User(req.body);
  await user.save();
  if (!user) {
    throw new ApiError(500, "User registration failed");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, user.toObject(), "User registered successfully")
    );
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, addressLine1, country, city } = req.body;
  const user = await User.findById(req.userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  user.name = name;
  user.addressLine1 = addressLine1;
  user.country = country;
  user.city = city;
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, user.toObject(), "User updated successfully"));
});

const getUser = asyncHandler(async (req: Request, res: Response) => {
  const currentUser = await User.findById(req.userId);
  if (!currentUser) {
    throw new ApiError(404, "User not found");
  }
  res.status(200).json(currentUser.toObject());
  res.json("ok");
});

export { registerUser, updateUser, getUser };
