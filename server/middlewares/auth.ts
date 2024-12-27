import { Response, Request, NextFunction } from "express";

const jwt = require("jsonwebtoken");

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const Authorization = req.headers.authorization;

    if (!Authorization || !Authorization.startsWith("Bearer ")) {
      res.status(401).json({ msg: "User not authenticated" });
      return;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};
