import * as Yup from "yup";
import { Request, Response } from "express";
import GetCoursesService from "../services/CourseServices/GetCoursesService";
import AppError from "../errors/AppError";
import CreateCourseService from "../services/CourseServices/CreateCourseService";

interface CourseData {
  name: string;
  description?: string;
  enabled: boolean;
  finalExam: string;
  finalProyect: string;
  schoolId: number;
}

export const index = async (req: Request, res: Response): Promise<Response> => {
  const courses = await GetCoursesService();

  return res.json({ courses });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  const newCourse: CourseData = req.body

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string(),
    enabled: Yup.boolean().required(),
    finalExam: Yup.string().required(),
    finalProyect: Yup.string().required(),
    schoolId: Yup.number().required(),
  });

  try {
    await schema.validate(newCourse);
  } catch (err: any) {
    throw new AppError(err.message);
  }

   const course = await CreateCourseService(newCourse);

    return res.status(200).json(course);
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({ message: "Show"});
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json({ message: "Update"});
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json({ message: "User deleted" });
};
