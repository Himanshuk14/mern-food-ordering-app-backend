import { Router } from "express";
import { param } from "express-validator";
import { searchRestaurant } from "../controllers/Restaurant.controller";
const router = Router();

router
  .route("/search/:city")
  .get(
    param("city").isString().trim().notEmpty().withMessage("City is required"),
    searchRestaurant
  );

export default router;
