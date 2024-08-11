import { body, validationResult } from "express-validator";
import { asyncHandler } from "../utils/asyncHandler";

const handleValidationErrors = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
});

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Address Line 1 must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body("restaurantName")
    .isString()
    .notEmpty()
    .withMessage("Restaurant Name is required"),
  body("city").isString().notEmpty().withMessage("City is required"),
  body("country").isString().notEmpty().withMessage("Country is required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .notEmpty()
    .withMessage("Delivery Price must be a number"),
  body("estimatedDeliveryTime")
    .isNumeric()
    .notEmpty()
    .withMessage("Estimated Delivery Time must be a number"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array")
    .not()
    .isEmpty(),
  body("menuItems")
    .isArray()
    .notEmpty()
    .withMessage("Menu Items must be an array"),
  body("menuItems.*.name").notEmpty().withMessage("Menu Item Name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu Item Name is required and must be a number"),
  handleValidationErrors,
];
