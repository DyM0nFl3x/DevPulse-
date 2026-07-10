import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { sendResponse } from "../utility/response";

export const globalErrorHandler: ErrorRequestHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // PostgreSQL Errors
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "detail" in error
  ) {
    switch (error.code) {
      case "23505":
        return sendResponse(res, 409, {
          message: "User already exists.",
          errors:
            typeof error.detail === "string"
              ? error.detail
              : "Duplicate value found.",
        });

      case "23502":
        return sendResponse(res, 400, {
          message: "Required field is missing.",
          errors:
            typeof error.detail === "string"
              ? error.detail
              : "NOT NULL constraint violated.",
        });

      case "23514":
        return sendResponse(res, 400, {
          message: "Invalid data.",
          errors:
            typeof error.detail === "string"
              ? error.detail
              : "Check constraint violated.",
        });
    }
  }

  // Application Errors
  if (error instanceof Error) {
    switch (error.message) {
      case "Invalid Credentials or user not found!":
        return sendResponse(res, 401, {
          message: "Authentication failed.",
          errors: "Invalid email or password.",
        });

      case "User not found":
        return sendResponse(res, 404, {
          message: "User not found.",
          errors: error.message,
        });

      case "Unauthorized":
        return sendResponse(res, 401, {
          message: "Unauthorized.",
          errors: error.message,
        });

      case "Forbidden":
        return sendResponse(res, 403, {
          message: "Access denied.",
          errors: error.message,
        });

      case "Title Required":
      case "Description Required":
      case "Type Required":
      case "Description Too Short":
      case "Invalid Issue Type":
      case "No Issue Found":
      case "No data provided for update!": {
        const messages: Record<string, string> = {
          "Title Required": "Issue title is required.",
          "Description Required": "Issue description is required.",
          "Type Required": "Issue type is required.",
          "Description Too Short": "Issue description is too short.",
          "Invalid Issue Type": "Invalid issue type.",
          "No Issue Found": "Issue not found for update.",
          "No data provided for update!": "No data provided for issue update.",
        };

        return sendResponse(res, 400, {
          message: messages[error.message] ?? "Validation failed.",
          errors: error.message,
        });
      }
    }
  }

  // Unknown Error
  return sendResponse(res, 500, {
    message: "Something went wrong.",
    errors: error instanceof Error ? error.message : "Internal server error.",
  });
};
