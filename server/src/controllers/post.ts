import { Request, Response } from "express";

import db from "../connect";

// want user's own posts & friends' posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await db.query(
      "SELECT p.*, u.id AS user_id, first_name, last_name, profile_pic FROM posts AS p JOIN users AS u ON (u.id = p.user_id)"
    );

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const addPost = async (req: Request, res: Response) => {
  const { content, img, user_id} = req.body;

  try {
    const post = await db.query(
      "INSERT INTO posts (content, img, user_id) values ($1, $2, $3) returning *",
      [content, img, user_id]
    );

    res.status(201).json(post.rows[0]);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};