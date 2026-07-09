import { pool } from "../../db";
import type { IAllIssue, IIssue } from "./issue.interface";

const createIssueInDB = async (data: IIssue, reporterId: number) => {
  const { title, description, type } = data;

  const result = await pool.query(
    `
        INSERT INTO issues(title, description, type, reporter_id)
        VALUES($1, $2, $3, $4)
        RETURNING *
        `,
    [title, description, type, reporterId],
  );

  return result;
};
const getAllDBIssues = async (data: IAllIssue) => {
  const result = await pool.query(`SELECT * FROM issues`);
  return result.rows;
};
export const issue = {
  createIssueInDB,
  getAllDBIssues,
};
