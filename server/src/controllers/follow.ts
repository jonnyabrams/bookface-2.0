import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import db from "../connect";

export const getFollows = async (req: Request, res: Response) => {
  try {
    const follows = await db.query(
      "SELECT follower_user_id from follows WHERE followed_user_id = $1",
      [req.query.followedUserId]
    );

    // return just the user ids
    res.status(200).json(follows.rows.map((follow) => follow.follower_user_id));
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const addFollow = async (req: Request, res: Response) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (err: any, userInfo: any) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      await db.query(
        "INSERT INTO follows (follower_user_id, followed_user_id) VALUES ($1, $2) returning *",
        [userInfo.id, req.body.userId]
      );

      res.status(201).json("User followed successfully");
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  });
};

export const deleteFollow = async (req: Request, res: Response) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (err: any, userInfo: any) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      await db.query(
        "DELETE FROM follows WHERE follower_user_id = $1 AND followed_user_id = $2",
        [userInfo.id, req.query.userId]
      );

      res.status(201).json("User unfollowed successfully");
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  });
};
