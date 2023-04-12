import * as Yup from "yup";
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import ShowModulesOfCourses from "../services/ModuleServices/ShowModulesOfCourses";
import ShowModuleService from "../services/ModuleServices/ShowModuleService";
import CreateModuleService from "../services/ModuleServices/CreateModuleService";
import UpdateModuleService from "../services/ModuleServices/UpdateModuleService";
import DeleteModuleService from "../services/ModuleServices/DeleteModuleService";

interface ModuleData {
  name: string;
  description?: string;
  enabled: boolean;
  courseId: number;
}

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { courseId } = req.params;

  const modules = await ShowModulesOfCourses(courseId);

  return res.status(200).json(modules);
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const newModule: ModuleData = req.body;

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string(),
    enabled: Yup.boolean().required(),
    courseId: Yup.number().required()
  });

  try {
    await schema.validate(newModule);
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const module = await CreateModuleService(newModule);

  return res.status(200).json(module);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  const { moduleId } = req.params;

  const module = await ShowModuleService(moduleId);

  return res.status(200).json(module);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const moduleData: ModuleData = req.body;

  const schema = Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    enabled: Yup.boolean(),
    courseId: Yup.number()
  });

  try {
    await schema.validate(moduleData);
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const { moduleId } = req.params;

  const module = await UpdateModuleService({ moduleData, moduleId });

  return res.status(200).json(module);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { moduleId } = req.params;

  await DeleteModuleService(moduleId);

  return res.status(200).json({ message: "Module deleted" });
};
