import express from "express";

import { addPost, getPosts, deletePost } from "../controllers/post";

const router = express.Router();

router.get("/", getPosts)
router.post("/", addPost)
router.delete("/:id", deletePost)

export default router;
