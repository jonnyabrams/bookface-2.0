import express from "express";

import { addFollow, deleteFollow, getFollows } from "../controllers/follow";

const router = express.Router();

router.get("/", getFollows);
router.post("/", addFollow)
router.delete("/", deleteFollow)

export default router;
