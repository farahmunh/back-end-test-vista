import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// POST /services → create a new service
export const createService = async (req: Request, res: Response) => {
  try {
    const { companyId, name, description, price } = req.body;

    if (!companyId || !name || !price) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const service = await prisma.service.create({
      data: { companyId, name, description, price: parseFloat(price) },
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error creating service", error });
  }
};

// GET /services/:id → get a service by id
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const service = await prisma.service.findUnique({
      where: { id },
      include: { company: true }, // also return company info
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Error fetching service", error });
  }
};

// DELETE /services/:id → delete a service
export const deleteService = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.service.delete({
      where: { id },
    });
    res.json({ message: `Service ${id} deleted` });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service", error });
  }
};

// PUT /services/:id → update a service
export const updateService = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, price } = req.body;

    const updatedService = await prisma.service.update({
      where: { id },
      data: { name, description, price },
    });

    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ message: "Error updating service", error });
  }
};


