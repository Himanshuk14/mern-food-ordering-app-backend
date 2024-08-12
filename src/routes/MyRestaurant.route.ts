import { Router } from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth.middleware";
import { validateMyRestaurantRequest } from "../middlewares/validation";
import { upload } from "../middlewares/multer.middleware";
import {
  createMyRestaurant,
  getMyRestaurant,
  updateMyRestaurant,
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
router
  .route("/")
  .put(
    upload.single("imageFile"),
    validateMyRestaurantRequest,
    jwtCheck,
    jwtParse,
    updateMyRestaurant
  );
export default router;
