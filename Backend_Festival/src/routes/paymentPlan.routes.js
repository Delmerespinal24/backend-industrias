import { Router } from "express";
import { methods as paymentPlanController } from "./../controllers/paymentPlan.controller";

const router = Router();

router.post("/", paymentPlanController.addCard);

export default router;