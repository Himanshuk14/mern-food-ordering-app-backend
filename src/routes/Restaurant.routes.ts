import { Router } from "express";
import { param } from "express-validator";
import {
  getRestaurant,
  searchRestaurant,
} from "../controllers/Restaurant.controller";
const router = Router();

router
  .route("/search/:city")
  .get(
    param("city").isString().trim().notEmpty().withMessage("City is required"),
    searchRestaurant
  );
router.route("/:restaurantId").get(
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("RestaurantId paramter must be a valid "),

  getRestaurant
);
export default router;
