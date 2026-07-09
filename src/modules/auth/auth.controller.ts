import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utility/response";
import type { ISignupPayload } from "./auth.interface";
import { authService } from "./auth.service";

const signup = async (
   req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.signupService(req.body);
    sendResponse(res, 201, {
      success: true,
      message: "User registered successfully",
      // data: result,
    });
  } catch (error) {
    next(error);
  }
};



const login = () => {};
export const authController = {signup, login};
