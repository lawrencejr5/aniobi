import { Request, Response } from "express";

const notFound = (req: Request, res: Response): void => {
  res.status(404).json({ msg: "route not found" });
};

export default notFound;
