import express from "express";

import { addFollow, deleteFollow, getCurrentUserFollows, getFollows } from "../controllers/follow";

const router = express.Router();

router.get("/", getFollows);
router.get("/following", getCurrentUserFollows);
router.post("/", addFollow)
router.delete("/", deleteFollow)

export default router;
