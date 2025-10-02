import { Router } from "express";
import { createCompany, getCompanies } from "../controllers/companyController";
import { deleteCompany } from "../controllers/companyController";
import { updateCompany } from "../controllers/companyController";

const router = Router();

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
router.post("/", createCompany);

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
router.put("/:id", updateCompany);

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
