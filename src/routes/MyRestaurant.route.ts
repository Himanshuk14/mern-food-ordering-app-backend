import { Router } from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth.middleware";
import { validateMyRestaurantRequest } from "../middlewares/validation";
import { upload } from "../middlewares/multer.middleware";
import {
  createMyRestaurant,
  getMyRestaurant,
} from "../controllers/MyRestaurant.controller";

const router = Router();

router
  .route("/")
  .post(
    upload.single("imageFile"),
    validateMyRestaurantRequest,
    jwtCheck,
    jwtParse,
    createMyRestaurant
  );

router.route("/").get(jwtCheck, jwtParse, getMyRestaurant);

export default router;
