import type { Request, Response, NextFunction } from "express";
import { registerService, loginService } from "../services/authService";
import { ApiResponse } from "../utils/apiResponse";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await registerService(req.body);
    res.status(201).json(new ApiResponse(result, "Registered successfully"));
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json(new ApiResponse(result, "Logged in successfully"));
  } catch (error) {
    next(error);
  }
};
