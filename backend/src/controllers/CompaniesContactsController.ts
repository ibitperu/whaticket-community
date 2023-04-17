import { Request, Response } from "express";
import ShowContactsForCompanyService from "../services/CompanyContactsServices/ShowContactsForCompanyService";
import ShowCompanyForContact from "../services/CompanyContactsServices/ShowCompanyForContact";

export const showContacts = async (req: Request, res: Response): Promise<Response> => {
    const { companyId } = req.params;

    const contacts = await ShowContactsForCompanyService(companyId)

  return res.json({ contacts });
};

export const showCompany = async (req: Request, res: Response): Promise<Response> => {
  const { contactId } = req.params;

  const company = await ShowCompanyForContact(contactId)

  return res.json()
}