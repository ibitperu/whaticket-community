import express from "express";
import * as CompaniesContactsController from "../controllers/CompaniesContactsController";

const companyContactsRoutes = express.Router();

companyContactsRoutes.get("/companies_contacts/:companyId", CompaniesContactsController.showContacts);

companyContactsRoutes.get("/contacts_companies/:contactId", CompaniesContactsController.showCompany)

export default companyContactsRoutes;