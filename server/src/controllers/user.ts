import { Request, Response } from "express";
import db from "../connect";

export const getUser = (req: Request, res: Response) => {};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.query("select * from users");

    res.status(200).json(users.rows);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
