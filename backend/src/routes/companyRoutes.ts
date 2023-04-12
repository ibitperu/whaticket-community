import express from "express";
import * as CompaniesController from "../controllers/CompaniesController";

const companyRoutes = express.Router();

companyRoutes.get("/companies", CompaniesController.index);

companyRoutes.get("/companies/:companyId", CompaniesController.show);

companyRoutes.post("/companies", CompaniesController.store);

companyRoutes.put("/companies/:companyId", CompaniesController.update)

companyRoutes.delete("/companies/:companyId", CompaniesController.remove)

export default companyRoutes;