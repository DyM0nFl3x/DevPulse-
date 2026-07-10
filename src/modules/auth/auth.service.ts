import { compare, hash } from "bcrypt";
import type { ILogin, ISignup } from "./auth.interface";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";
import type { IJwt } from "../../types";

const signupService = async (payload: ISignup) => {
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

const loginService = async (payload: ILogin) => {
  const { email, password } = payload;
  //Check if user exists?
  const checkUserFromDB = await pool.query(
    `
    SELECT * FROM users
    WHERE email=$1
    `,
    [email],
  );

  if (checkUserFromDB.rowCount === 0) {
    throw new Error("Invalid Credentials or user not found!");
  }
  //Get user data
  const userData = checkUserFromDB.rows[0];
  const { password: hashPassword, ...rest } = userData;
  const comparePassword = await compare(password, hashPassword);

  if (comparePassword) {
    //token generation
    const jwtPayload:IJwt = {
      id: rest.id,
      name: rest.name,
      role: rest.role,
    };

    const generateToken = jwt.sign(jwtPayload, config.secret,{expiresIn:config.tokenExpiresIn});

    return { rest, generateToken };
  } else {
    throw new Error("Invalid Credentials!");
  }
};

export const authService = {
  signupService,
  loginService,
};
