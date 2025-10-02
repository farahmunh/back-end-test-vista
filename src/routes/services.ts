import { Router } from "express";
import { createService, getServiceById } from "../controllers/serviceController";
import { deleteService } from "../controllers/serviceController";
import { updateService } from "../controllers/serviceController";

const router = Router();

router.post("/", createService);
router.get("/:id", getServiceById);
router.delete("/:id", deleteService);
router.put("/:id", updateService);

export default router;
