import type { NextFunction, Request, Response } from "express";
import type { IJwtPayload, Role } from "../types";
import { sendResponse } from "../utility/response";
import config from "../config";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload;
    }
  }
}

export const authMiddleware = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userToken = req.headers.authorization;
      if (!userToken) {
        return sendResponse(res, 401, {
          message: "Unauthorized access",
          errors: "User is not authorized",
        });
      }

      const decoded = jwt.verify(userToken, config.secret) as IJwtPayload;
      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};
