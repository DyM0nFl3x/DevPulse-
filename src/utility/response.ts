import type { Response } from "express";
import type { ISendResponse } from "../types";

export const sendResponse = <T>(
  res: Response,
  code = 200,
  payload: ISendResponse<T>,
): void => {
  res.status(code).json(payload)
};
