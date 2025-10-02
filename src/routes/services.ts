import { Router } from "express";
import { createService, getServiceById, updateService, deleteService } from "../controllers/serviceController";
import { body, param, validationResult } from "express-validator";

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
 * /services:
 *   post:
 *     description: Create a new service
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyId:
 *                 type: integer
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Service created successfully
 */
router.post(
    "/",
    [
        body("companyId").notEmpty().withMessage("Company ID is required").isInt().withMessage("Company ID must be an integer"),
        body("name").notEmpty().withMessage("Service name is required"),
        body("price").notEmpty().withMessage("Price is required").isFloat().withMessage("Price must be a number"),
    ],
    validateRequest, 
    createService
);

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     description: Get a service by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The service ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved service
 *       404:
 *         description: Service not found
 */
router.get("/:id", getServiceById);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     description: Update a service by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The service ID
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
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       404:
 *         description: Service not found
 */
router.put(
    "/:id",
    [
        param("id").isInt().withMessage("Service ID must be an integer"),
        body("name").notEmpty().withMessage("Service name is required"),
        body("price").notEmpty().withMessage("Price is required").isFloat().withMessage("Price must be a number"),
    ],
    validateRequest,
    updateService
);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     description: Delete a service by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The service ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 */
router.delete("/:id", deleteService);

export default router;
