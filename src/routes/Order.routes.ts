import { Router } from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth.middleware";

import {
  createCheckoutSession,
  getMyOrders,
  stripeWebhookHandler,
} from "../controllers/Order.controller";

const router = Router();

router
  .route("/checkout/create-checkout-session")
  .post(jwtCheck, jwtParse, createCheckoutSession);

router.route("/checkout/webhook").post(stripeWebhookHandler);
router.route("/").get(jwtCheck, jwtParse, getMyOrders);
export default router;
