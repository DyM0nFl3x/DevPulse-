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

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {generateToken:token,rest:user} = await authService.loginService(req.body);
    // console.log(result);
    sendResponse(res, 200, {
      message: "User login successfully.",
      data: {token,user},
    });
  } catch (error) {
    next(error);
  }
};
export const authController = { signup, login };
