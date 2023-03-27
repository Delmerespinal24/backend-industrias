import { Router } from "express";
import { methods as userDataController } from "../controllers/userData.controller";

const router = Router();

router.post("/", userDataController.userData);

export default router;
