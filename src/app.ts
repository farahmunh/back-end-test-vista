import express from "express";
import cors from "cors";
import companiesRouter from "./routes/companies";
import servicesRouter from "./routes/services";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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

// Middleware
app.use(cors());
app.use(express.json());

// Serve Swagger documentation at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes
app.use("/companies", companiesRouter);
app.use("/services", servicesRouter);

export default app;