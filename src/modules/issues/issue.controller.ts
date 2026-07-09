import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utility/response";
import type { IAllIssue, IIssue } from "./issue.interface";
import { issue } from "./issue.service";

const { createIssueInDB, getAllDBIssues, getSingleDBIssue } = issue;

const createIssue = async (
  req: Request<{}, {}, IIssue>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reporterId = req.user?.id;

    if (!reporterId) {
      throw new Error("User information is missing");
    }

    const result = await createIssueInDB(req.body, reporterId);

    sendResponse(res, 201, {
      message: "Issue created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllIssues = async (
  req: Request<{}, {}, {}, IAllIssue>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getAllDBIssues(req.query);
    sendResponse(res, 200, {
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleIssue = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getSingleDBIssue(Number(req.params.id));
    sendResponse(res, 200, {
      data: result[0],
    });
  } catch (error) {
    next(error);
  }
};
export const issueController = { createIssue, getAllIssues, getSingleIssue };
