import express from "express";
import cors from "cors";
import companiesRouter from "./routes/companies";
import servicesRouter from "./routes/services";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Request, Response, NextFunction } from 'express';

const app = express();

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Company and Service Management API',
      version: '1.0.0',
      description: 'API documentation for managing companies and services',
    },
  },
  apis: ['./src/routes/*.ts'], // Path to your route files for documentation
};

// Create Swagger specs
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Logging Middleware to log HTTP method, path, and timestamp
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();  // Get current timestamp
  console.log(`${timestamp} - ${req.method} ${req.path}`);  // Log method and path
  next();  // Proceed to the next middleware or route handler
};

// Apply the requestLogger middleware
app.use(requestLogger);  // This will log all requests

// Middleware
app.use(cors());
app.use(express.json());

// Serve Swagger documentation at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/companies", companiesRouter);
app.use("/services", servicesRouter);

export default app;