import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

export const updateUser = async (req: Request, res: Response) => {
  const { first_name, last_name, city, website, profile_pic, cover_pic } =
    req.body;

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (err: any, userInfo: any) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      await db.query(
        "UPDATE users SET first_name = $1, last_name = $2, city = $3, website = $4, cover_pic = $5, profile_pic = $6 WHERE id = $7 returning *",
        [
          first_name,
          last_name,
          city,
          website,
          cover_pic,
          profile_pic,
          userInfo.id,
        ]
      );

      res.status(201).json("User updated successfully");
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  });
};
