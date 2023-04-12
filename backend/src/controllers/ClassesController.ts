import * as Yup from "yup";
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import CreateClassService from "../services/ClassServices/CreateClassService";
import ShowClassesOfModule from "../services/ClassServices/ShowClassesOfModule";
import ShowClassService from "../services/ClassServices/ShowClassService";
import UpdateClassService from "../services/ClassServices/UpdateClassService";
import DeleteClassService from "../services/ClassServices/DeleteClassService";

interface ClassData {
  name: string;
  description?: string;
  message: string;
  classVideo: string;
  enabled: boolean;
  moduleId: number;
}

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { moduleId } = req.params;

  const classes = await ShowClassesOfModule(moduleId);

  return res.status(200).json(classes);
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const newClass: ClassData = req.body;

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string(),
    message: Yup.string().required(),
    classVideo: Yup.string().required(),
    enabled: Yup.boolean().required(),
    moduleId: Yup.number().required()
  });

  try {
    await schema.validate(newClass);
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const classCreated = await CreateClassService(newClass);

  return res.status(200).json(classCreated);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { classId } = req.params;

  const classForShow = await ShowClassService(classId);

  return res.status(200).json(classForShow);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const classData: ClassData = req.body;

  const schema = Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    message: Yup.string(),
    classVideo: Yup.string(),
    enabled: Yup.boolean(),
    moduleId: Yup.number()
  });

  try {
    await schema.validate(classData);
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const { classId } = req.params;

  const classUpdated = await UpdateClassService({ classData, classId });

  return res.status(200).json(classUpdated);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { classId } = req.params;

  await DeleteClassService(classId);

  return res.status(200).json({ message: "Module deleted" });
};

