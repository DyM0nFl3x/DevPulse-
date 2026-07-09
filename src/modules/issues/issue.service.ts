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
  //!! add challenge later !!

  const result = await pool.query(`SELECT * FROM issues`);
  return result.rows;
};

const getSingleDBIssue = async (id: number) => {
  const issue = await pool.query(
    `
        SELECT * FROM issues
        WHERE id =${id}
        `,
  );
  return issue.rows;
};

export const issue = {
  createIssueInDB,
  getAllDBIssues,
  getSingleDBIssue,
};
