import type { NextFunction, Request, Response } from "express";
import type { IJwtPayload, Role } from "../types";
import { sendResponse } from "../utility/response";
import config from "../config";
import jwt from "jsonwebtoken";
import { issue } from "../modules/issues/issue.service";

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
      console.log(decoded);
      if (req.method === "PATCH") {
        const issueData = await issue.getSingleDBIssue(Number(req.params.id));
        const reporterId = issueData[0].reporter_id;
        if (decoded.role === "contributor") {
          if (decoded.id !== reporterId) {
            throw new Error("You are not allowed to update this issue.");
          }

          if (issueData[0].status !== "open") {
            throw new Error("Issue is not open for updates.");
          }
        }
      }

      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};
