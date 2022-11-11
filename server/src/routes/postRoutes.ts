import express from "express";

import { addPost, getPosts } from "../controllers/post";

const router = express.Router();

router.get("/", getPosts)
router.post("/", addPost)

export default router;
