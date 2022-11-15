import { Request, Response } from "express";

import jwt from 'jsonwebtoken'
import db from "../connect";

export const getLikes = async (req: Request, res: Response) => {
  try {
    const likes = await db.query(
      "SELECT user_id from likes WHERE post_id = $1",
      [req.query.postId]
    );

    // return just the user ids
    res.status(200).json(likes.rows.map((like) => like.user_id));
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
}

export const addLike = async (req: Request, res: Response) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (err: any, userInfo: any) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const like = await db.query(
        "INSERT INTO likes (user_id, post_id) VALUES ($1, $2) returning *",
        [userInfo.id, req.body.postId]
      );

      res.status(201).json("Post liked successfully");
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  });
}

export const deleteLike = async (req: Request, res: Response) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (err: any, userInfo: any) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const like = await db.query(
        "DELETE FROM likes WHERE user_id = $1 AND post_id = $2",
        [userInfo.id, req.query.postId]
      );

      res.status(201).json("Post unliked successfully");
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  });
}

