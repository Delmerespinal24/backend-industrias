import { Router } from "express";
import { methods as signupAdminController } from "./../controllers/signupAdmin.controller";

const router = Router();

router.post("/", signupAdminController.addUser);


export default router;
