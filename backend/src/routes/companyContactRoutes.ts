import express from "express";
import * as CompaniesContactsController from "../controllers/CompaniesContactsController";

const companyContactsRoutes = express.Router();

companyContactsRoutes.get("/companies_contacts/:companyId", CompaniesContactsController.show);

export default companyContactsRoutes;