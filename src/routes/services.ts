import { Router } from "express";
import { createService, getServiceById } from "../controllers/serviceController";
import { deleteService } from "../controllers/serviceController";
import { updateService } from "../controllers/serviceController";

const router = Router();

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
router.post("/", createService);

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
router.put("/:id", updateService);

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
