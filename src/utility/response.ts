import type { Response } from "express";
import type { ApiResponse } from "../types";

const defaultMessages: Record<number, string> = {
  200: "Request completed successfully.",
  201: "Resource created successfully.",
  204: "Request completed successfully.",
  400: "Bad request.",
  401: "Authentication required.",
  403: "Access denied.",
  404: "Resource not found.",
  409: "Conflict detected.",
  500: "Internal server error.",
};

export const sendResponse = <T>(
  res: Response,
  code = 200,
  payload: ApiResponse<T> = {}
): void => {
  res.status(code).json({
    success: code >= 200 && code < 300,
    message:
      payload.message ??
      defaultMessages[code] ??
      "Request processed.",
    data: payload.data,
    errors: payload.errors,
  });
};