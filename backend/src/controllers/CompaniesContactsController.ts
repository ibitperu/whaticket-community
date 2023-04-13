import { Request, Response } from "express";
import ShowContactsForCompanyService from "../services/CompanyContactsServices/ShowContactsForCompanyService";

export const show = async (req: Request, res: Response): Promise<Response> => {
    const { companyId } = req.params;

    const contacts = await ShowContactsForCompanyService(companyId)

  return res.json({ contacts });
};