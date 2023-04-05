import { Request, Response } from "express";

export const index = async (req: Request, res: Response): Promise<Response> => {
  return res.json({ message: "Index" });
};

export const store = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({ message: "Store"});
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
