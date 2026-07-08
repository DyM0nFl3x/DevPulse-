import type { Request, Response } from "express";

const signup = (req: Request, res: Response) => {
  console.log(req.body);

  delete req.body.password;

  res.json({
    success: true,
    message: "User registered successfully",
    data: req.body,
  });
};

const login = (req: Request, res: Response) => {};

export { signup, login };
