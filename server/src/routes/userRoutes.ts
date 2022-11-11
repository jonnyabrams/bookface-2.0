import express from "express";
import { getAllUsers, getUser } from "../controllers/user";

const router = express.Router();

router.get("/find/:id", getUser)
router.get("/find", getAllUsers)

export default router;
