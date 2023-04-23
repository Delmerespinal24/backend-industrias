import { Router } from "express";
import { methods as signInSaasController } from "./../controllers/signInSaas.controller";


const router = Router();

router.post("/", signInSaasController.signInSaas);


export default router;