import * as Yup from "yup";
import { Request, Response } from "express";
import AppError from "../errors/AppError";

export const index = async (req: Request, res: Response): Promise<Response> => {
  return res.json({ mssg: "Index" });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  return res.json({ mssg: "Store" });
};

export const show = async (req: Request, res: Response): Promise<Response> => {
  return res.json({ mssg: "Show" });
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.json({ mssg: "Update" });
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.json({ mssg: "delete" });
};

