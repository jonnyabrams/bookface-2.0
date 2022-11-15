import express from "express";
import { getAllUsers, getUser } from "../controllers/user";

const router = express.Router();

router.get("/find/:username", getUser)
router.get("/find", getAllUsers)

export default router;
