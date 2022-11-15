import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import db from "../connect";

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await db.query(
      // returns all user's posts + posts of those they follow
      `SELECT c.*, u.id AS user_id, first_name, last_name, profile_pic FROM comments AS c JOIN users AS u ON (u.id = c.user_id)
      WHERE c.post_id = $1
      ORDER BY c.created_at DESC`,
      [req.query.postId]
    );

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const addComment = async (req: Request, res: Response) => {
  const { content, post_id } = req.body;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (err: any, userInfo: any) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const comment = await db.query(
        "INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3) returning *",
        [content, userInfo.id, post_id]
      );

      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  });
};
