import type { NextFunction, Request, Response } from "express";
import type { IJwt, Role } from "../types";
import { sendResponse } from "../utility/response";
import config from "../config";
import jwt from "jsonwebtoken";
import { issue } from "../modules/issues/issue.service";

declare global {
  namespace Express {
    interface Request {
      user?: IJwt;
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
      const decoded = jwt.verify(userToken, config.secret) as IJwt;

      if (roles.length && !roles.includes(decoded.role)) {
        return sendResponse(res, 403, {
          message: "Access Forbidden!",
          errors: "Access is not available for the role",
        });
      }

      if (req.method === "PATCH") {
        const issueData = await issue.getSingleDBIssue(Number(req.params.id));
        if (issueData.length === 0) {
          throw new Error("No Issue Found");
        }
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

      if (req.method === "DELETE" && decoded.role !== "maintainer") {
        throw new Error("Only maintainers can delete issues.");
      }

      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};
