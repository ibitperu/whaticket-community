import * as Yup from "yup";
import { Request, Response } from "express";
import AppError from "../errors/AppError";
import ShowModulesOfCourses from "../services/ModuleServices/ShowModulesOfCourses";

export const index = async (req: Request, res: Response): Promise<Response> => {
  const { courseId } = req.params;

  console.log(courseId)

  const modules = await ShowModulesOfCourses(courseId);

  return res.status(200).json(modules);
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({ mssg: "Store" });
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  // const { courseId } = req.params;

  //   const course = await ShowCourseService(courseId);

  //   return res.status(200).json(course);

  return res.status(200).json({ mssg: "Show" });
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json({ mssg: "Update" });
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json({ message: "School deleted" });
};
