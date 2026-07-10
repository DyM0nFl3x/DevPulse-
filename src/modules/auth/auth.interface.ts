import type { Role } from "../../types";

export interface ISignup {
  name: string;
  email: string;
  password: string;
  role?: Role;
}


export interface ILogin {
  email: string;
  password: string;
}