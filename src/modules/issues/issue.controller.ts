import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utility/response";
import type { IAllIssue, IIssue } from "./issue.interface";
import { issue } from "./issue.service";
import { validateIssue } from "./issue.utils";

const {
  createIssueInDB,
  getAllDBIssues,
  getSingleDBIssue,
  deleteDBIssue,
  updateDBIssue,
} = issue;

const createIssue = async (
  req: Request<{}, {}, IIssue>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, type } = req.body;
    validateIssue(title, description, type);

    const reporterId = req.user?.id;
    if (!reporterId) {
      throw new Error("User information is missing");
    }

    const result = await createIssueInDB(req.body, reporterId);
    sendResponse(res, 201, {
      message: "Issue created successfully",
      data: result.rows[0],
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
    if (result.length===0) {
      throw Error ("No Issue Found")
    }
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
    if (result.length === 0) {
      throw new Error("No Issue Found");
    }
    sendResponse(res, 200, {
      data: result[0],
    });
  } catch (error) {
    next(error);
  }
};

const updateIssue = async (
  req: Request<{ id: string }, {}, Partial<IIssue>>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await updateDBIssue(req.body, Number(req.params.id));
    sendResponse(res, 200, {
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteIssue = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await deleteDBIssue(Number(req.params.id));
    if (result.rowCount === 0) {
      throw new Error("No issue found!");
    }
    sendResponse(res, 200, { message: "Issue deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
