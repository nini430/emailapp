import express from "express";
import { getMessages, sendMessage } from "../controllers/messages.js";

const router = express();

router.get("/:firstName/:secondName", getMessages);
router.post("/", sendMessage);

export default router;
