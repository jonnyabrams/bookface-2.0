import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import db from "../connect";

export const register = async (req: Request, res: Response) => {
  const { email, first_name, last_name } = req.body;

  try {
    // check if user exists
    const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows[0]) return res.status(409).json("User already exists");

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // create new user in db
    const newUser = await db.query(
      "INSERT INTO users (first_name, last_name, email, password) values ($1, $2, $3, $4) returning *",
      [first_name, last_name, email, hashedPassword]
    );

    // isolate password to remove it from returned data
    const { password, ...others } = newUser.rows[0];

    res.status(201).json(others);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const login = (req: Request, res: Response) => {};

export const logout = (req: Request, res: Response) => {};
