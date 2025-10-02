import express from "express";
import cors from "cors";
import companiesRouter from "./routes/companies";
import servicesRouter from "./routes/services";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/companies", companiesRouter);
app.use("/services", servicesRouter);

export default app;