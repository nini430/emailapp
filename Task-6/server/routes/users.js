import express from "express";
import { startChat, getUsers } from "../controllers/users.js";

const router = express.Router();

router.post("/", startChat);
router.get("/", getUsers);

export default router;
