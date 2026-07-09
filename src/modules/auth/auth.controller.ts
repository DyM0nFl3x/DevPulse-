import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utility/response";
import { authService } from "./auth.service";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.signupService(req.body);

    delete result.password;

    sendResponse(res, 201, {
      message: "User created successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
  sendResponse(res, 201, {
    message: "User created successfully.",
    // data: result,
  });
};
export const authController = { signup, login };
