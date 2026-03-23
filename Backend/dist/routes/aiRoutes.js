import express from "express";
import { askAI, saveData } from "../controllers/aiController.js";
const router = express.Router();
router.post("/ask-ai", askAI);
router.post("/save", saveData);
export default router;
