import { Router } from "express";
import { methods as machineryController } from "../controllers/machinery.controller";

const router = Router();

router.post("/add", machineryController.addMachine);
router.get("/", machineryController.getMachinery);
router.put("/edit/:idMaquina", machineryController.updateMachine);
router.delete("/delete/:idMaquina", machineryController.deleteMachine);
router.get("/:marca", machineryController.getMachineryxbrand);

export default router;
