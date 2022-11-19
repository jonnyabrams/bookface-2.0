import express from "express";
import { getAllUsers, getUser, updateUser } from "../controllers/user";

const router = express.Router();

router.get("/find/:username", getUser)
router.get("/find", getAllUsers)
router.put("/", updateUser)

export default router;
