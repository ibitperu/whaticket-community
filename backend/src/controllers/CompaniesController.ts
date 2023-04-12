import * as Yup from "yup";
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import GetCompanyService from "../services/CompanyServices/GetCompanyService";
import createCompanyService from "../services/CompanyServices/CreateCompanyService";
import ShowCompanyService from "../services/CompanyServices/ShowCompanyServices";
import UpdateCompanyService from "../services/CompanyServices/UpdateCompanyServices";
import DeleteCompanyService from "../services/CompanyServices/DeleteCompanyService";

interface CompanyData {
  name: string;
  description?: string;
  enabled: boolean;
}

export const index = async (req: Request, res: Response): Promise<Response> => {
  const companies = await GetCompanyService();

  return res.json({ companies });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const newCompany: CompanyData = req.body;
  const { name, description, enabled } = newCompany;

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string(),
    enabled: Yup.boolean().required()
  });

  try {
    await schema.validate(newCompany);
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const company = await createCompanyService({
    name,
    description,
    enabled
  });

  return res.status(200).json(company);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.params;

  const company = await ShowCompanyService(companyId);


  return res.status(200).json(company);

};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const companyData: CompanyData = req.body;
  
  const schema = Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    enabled: Yup.boolean()
  });

  try {
    await schema.validate(companyData);
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const { companyId } = req.params;
   
  const company = await UpdateCompanyService({ companyData, companyId });

   
  return res.status(200).json(company);

};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { companyId } = req.params

  await DeleteCompanyService(companyId)

  return res.status(200).json({ message: "Company deleted" });
};

