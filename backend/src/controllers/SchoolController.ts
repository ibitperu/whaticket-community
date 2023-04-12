import * as Yup from "yup";
import { Request, Response } from "express";
import GetSchoolsService from "../services/SchoolServices/GetSchoolsService";
import createSchoolService from "../services/SchoolServices/CreateSchoolService";
import AppError from "../errors/AppError";
import ShowContactService from "../services/ContactServices/ShowContactService";
import ShowSchoolService from "../services/SchoolServices/ShowSchoolService";
import UpdateSchoolService from "../services/SchoolServices/UpdateSchoolService";
import DeleteSchoolService from "../services/SchoolServices/DeleteSchoolService";


interface SchoolData {
  name: string;
  description?: string;
  enabled: boolean;
}

export const index = async (req: Request, res: Response): Promise<Response> => {
  const schools = await GetSchoolsService();

  return res.json({ schools });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const newSchool: SchoolData = req.body;
  const { name, description, enabled } = newSchool;

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string(),
    enabled: Yup.boolean().required()
  });

  try {
    await schema.validate(newSchool);
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const school = await createSchoolService({
    name,
    description,
    enabled
  });

  return res.status(200).json(school);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { schoolId } = req.params;

  const school = await ShowSchoolService(schoolId);


  return res.status(200).json(school);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const schoolData: SchoolData = req.body;
  
  const schema = Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    enabled: Yup.boolean()
  });

  try {
    await schema.validate(schoolData);
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const { schoolId } = req.params;
   
  const school = await UpdateSchoolService({ schoolData, schoolId });

   
  return res.status(200).json(school);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { schoolId } = req.params

  await DeleteSchoolService(schoolId)

  return res.status(200).json({ message: "School deleted" });
};
