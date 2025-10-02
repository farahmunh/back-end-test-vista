import { Router } from "express";
import { createCompany, getCompanies, deleteCompany, updateCompany } from "../controllers/companyController";
import { body, validationResult } from "express-validator";

const router = Router();

// Middleware to handle validation results
const validateRequest = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * @swagger
 * /companies:
 *   get:
 *     description: Get all companies
 *     responses:
 *       200:
 *         description: A list of companies
 */
router.get("/", getCompanies);

/**
 * @swagger
 * /companies:
 *   post:
 *     description: Create a new company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               registrationNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Company created successfully
 */
router.post(
    "/", 
    [
        body("name").notEmpty().withMessage("Company name is required"),
        body("registrationNumber").notEmpty().withMessage("Registration number is required"),
    ],
    validateRequest,
    createCompany
);

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     description: Update a company
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The company ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               registrationNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company updated successfully
 */
router.put(
    "/:id", 
    [
        body("name").notEmpty().withMessage("Company name is required"),
        body("registrationNumber").notEmpty().withMessage("Registration number is required"),
    ],
    validateRequest,
    updateCompany
);

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     description: Delete a company
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The company ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Company deleted successfully
 */
router.delete("/:id", deleteCompany);

export default router;
