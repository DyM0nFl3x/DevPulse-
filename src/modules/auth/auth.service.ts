import { compare, hash } from "bcrypt";
import type { ISignupPayload } from "./auth.interface";
import { pool } from "../../db";

const signupService = async (payload: ISignupPayload) => {
  console.log(payload);
  const { email, name, password, role } = payload;
  const hashedPassword = await hash(password, 10);

  const result = await pool.query(
    `
            INSERT INTO users(name, email, password, role)
            VALUES($1, $2, $3, COALESCE($4, 'contributor'))
            RETURNING *
            `,
    [name, email, hashedPassword, role],
  );

  return result.rows[0];
};

export const authService = {
  signupService,
};
