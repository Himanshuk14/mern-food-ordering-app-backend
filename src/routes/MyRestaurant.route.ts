import { Router } from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth.middleware";
import { validateMyRestaurantRequest } from "../middlewares/validation";
import { upload } from "../middlewares/multer.middleware";
import { createMyRestaurant } from "../controllers/MyRestaurant.controller";

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

export default router;
