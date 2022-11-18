import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import db from "../connect";

export const getFollows = async (req: Request, res: Response) => {
  try {
    const follows = await db.query(
      "SELECT follower_username FROM follows WHERE followed_username = $1",
      [req.query.followedUsername]
    );

    // return just the usernames
    res.status(200).json(follows.rows.map((follow) => follow.follower_username));
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
        "INSERT INTO follows (follower_username, followed_username) VALUES ($1, $2) returning *",
        [userInfo.username, req.body.username]
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
        "DELETE FROM follows WHERE follower_username = $1 AND followed_username = $2",
        [userInfo.username, req.query.username]
      );

      res.status(201).json("User unfollowed successfully");
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  });
};
