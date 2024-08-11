import { Router } from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth.middleware";
import { validateMyUserRequest } from "../middlewares/validation";
import { upload } from "../middlewares/multer.middleware";
import { createMyRestaurant } from "../controllers/MyRestaurant.controller";

const router = Router();

router.route("/").post(
  upload.single("imageFile"),

  createMyRestaurant
);

export default router;
