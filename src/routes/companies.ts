import { Router } from "express";
import { createCompany, getCompanies } from "../controllers/companyController";
import { deleteCompany } from "../controllers/companyController";
import { updateCompany } from "../controllers/companyController";

const router = Router();

router.post("/", createCompany);
router.get("/", getCompanies);
router.delete("/:id", deleteCompany);
router.put("/:id", updateCompany);

export default router;
