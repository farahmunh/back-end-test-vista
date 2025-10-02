import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// POST /companies → create a company
export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name, registrationNumber } = req.body;

    if (!name || !registrationNumber) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const company = await prisma.company.create({
      data: { name, registrationNumber },
      include: { services: true }
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: "Error creating company", error });
  }
};

// GET /companies → list all companies (with services included)
export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await prisma.company.findMany({
      include: { services: true },
    });

    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error });
  }
};

// DELETE /companies/:id → delete a company
export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.company.delete({
      where: { id },
    });
    res.json({ message: `Company ${id} deleted` });
  } catch (error) {
    res.status(500).json({ message: "Error deleting company", error });
  }
};

// PUT /companies/:id → update a company
export const updateCompany = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, registrationNumber } = req.body;

    const updatedCompany = await prisma.company.update({
      where: { id },
      data: { name, registrationNumber },
      include: { services: true },
    });

    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: "Error updating company", error });
  }
};


