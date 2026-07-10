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
  const { status, type, sort = "newest" } = data;

  let query = `
    SELECT *
    FROM issues
  `;

  const values: string[] = [];
  const conditions: string[] = [];

  if (status) {
    conditions.push(`status = $${values.length + 1}`);
    values.push(status);
  }

  if (type) {
    conditions.push(`type = $${values.length + 1}`);
    values.push(type);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  query +=
    sort === "oldest"
      ? " ORDER BY created_at ASC"
      : " ORDER BY created_at DESC";

  const result = await pool.query(query, values);

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

const updateDBIssue = async (data: Partial<IIssue>, id: number) => {
  const { title, description, type } = data;

  // At least one field is required
  if (title === undefined && description === undefined && type === undefined) {
    throw new Error("No data provided for update!");
  }

  // Check issue exists
  const existing = await pool.query("SELECT * FROM issues WHERE id = $1", [id]);

  if (existing.rowCount === 0) {
    throw new Error("No issues found!");
  }

  const issue = existing.rows[0];

  // Check if anything actually changed
  const newTitle = title ?? issue.title;
  const newDescription = description ?? issue.description;
  const newType = type ?? issue.type;

  if (
    newTitle === issue.title &&
    newDescription === issue.description &&
    newType === issue.type
  ) {
    throw new Error("No changes detected!");
  }

  // Update
  const result = await pool.query(
    `
  UPDATE issues
  SET
    title = $1,
    description = $2,
    type = $3,
    updated_at = NOW()
  WHERE id = $4
  RETURNING *;
  `,
    [newTitle, newDescription, newType, id],
  );

  return result.rows[0];
};

const deleteDBIssue = async (id: number) => {
  const data = await pool.query(
    `
     DELETE FROM issues
    WHERE id = $1
    RETURNING *;
    `,
    [id],
  );
  return data;
};

export const issue = {
  createIssueInDB,
  getAllDBIssues,
  getSingleDBIssue,
  updateDBIssue,
  deleteDBIssue,
};
