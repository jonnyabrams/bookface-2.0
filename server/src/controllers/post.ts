import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import db from "../connect";

// want user's own posts & friends' posts
export const getPosts = async (req: Request, res: Response) => {
  // get token
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", async (err: any, userInfo: any) => {
    if (err) return res.status(403).json("Token invalid");

    try {
      const posts = await db.query(
        // returns all user's posts + posts of those they follow
        `SELECT p.*, u.id AS user_id, first_name, last_name, profile_pic FROM posts AS p JOIN users AS u ON (u.id = p.user_id)
        LEFT JOIN follows AS f ON (p.username = f.followed_username) WHERE f.follower_username = $1 OR p.username = $1
        ORDER BY p.created_at DESC`,
        [userInfo.username]
      );

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  });
};

export const addPost = async (req: Request, res: Response) => {
  const { content, img } = req.body;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (err: any, userInfo: any) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const post = await db.query(
        "INSERT INTO posts (content, img, user_id, username) VALUES ($1, $2, $3, $4) returning *",
        [content, img, userInfo.id, userInfo.username]
      );

      res.status(201).json(post.rows[0]);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  });
};
