import { Router } from "express";
import {
  getUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller";
import { jwtCheck, jwtParse } from "../middlewares/auth.middleware";
import { validateMyUserRequest } from "../middlewares/validation";
const router = Router();

router.route("/register").post(jwtCheck, registerUser);
router
  .route("/update")
  .put(jwtCheck, jwtParse, validateMyUserRequest, updateUser);

router.route("/get-a-user").get(jwtCheck, jwtParse, getUser);

export default router;
