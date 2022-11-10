import express from "express";
import { getUser } from "../controllers/user";

const router = express.Router();

router.get("/find/:id", getUser)

export default router;
