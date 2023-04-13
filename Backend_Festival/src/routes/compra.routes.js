import { Router } from "express";
import { methods as purchaseController } from "./../controllers/compra.controller";

const router = Router();

router.post("/",purchaseController.addPurchase);

export default router;