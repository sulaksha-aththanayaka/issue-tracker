import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { ApiError } from "../utils/apiError";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    res.locals.user = decoded;
    next();
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
};
