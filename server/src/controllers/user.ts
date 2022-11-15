import { Request, Response } from "express";
import db from "../connect";

export const getUser = async (req: Request, res: Response) => {
  const username = req.params.username;

  try {
    const user = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    res.status(200).json(user.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.query("SELECT * FROM users");

    res.status(200).json(users.rows);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
