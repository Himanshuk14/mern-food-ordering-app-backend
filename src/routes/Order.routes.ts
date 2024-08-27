import { Router } from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth.middleware";
import { create } from "domain";
import {
  createCheckoutSession,
  stripeWebhookHandler,
} from "../controllers/Order.controller";

const router = Router();

router
  .route("/checkout/create-checkout-session")
  .post(jwtCheck, jwtParse, createCheckoutSession);

router.route("/checkout/webhook").post(stripeWebhookHandler);
export default router;
