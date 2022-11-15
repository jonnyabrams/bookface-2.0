import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from "../connect";

export const register = async (req: Request, res: Response) => {
  const { email, first_name, last_name, username } = req.body;

  try {
    // check if user exists
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows[0]) return res.status(409).json("User already exists");

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // create new user in db
    const newUser = await db.query(
      "INSERT INTO users (first_name, last_name, email, password, username) values ($1, $2, $3, $4, $5) returning *",
      [first_name, last_name, email, hashedPassword, username]
    );

    // isolate password to remove it from returned data
    const { password, ...others } = newUser.rows[0];

    res.status(201).json(others);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // check if user does not exist
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!user.rows[0]) return res.status(404).json("User not found");

    // check password
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      user.rows[0].password
    );

    if (!checkPassword) return res.status(400).json("Wrong credentials");

    // generate token
    const token = jwt.sign({ id: user.rows[0].id }, "secretkey");

    // destructure out password
    const { password, ...others } = user.rows[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none"
  }).status(200).json("User has been logged out")
};
