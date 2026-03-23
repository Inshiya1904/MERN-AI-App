import { Request, Response } from "express";
import axios from "axios";
import AI from "../models/aiModels.js";

// Ask AI
export const askAI = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    // Validation
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const currentYear = new Date().getFullYear();

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant. The current year is ${currentYear}. 
Give clear, structured answers. 
If the question is about real-time events (news, war, updates), clearly say you do not have real-time data.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.7, // 🔥 better natural responses
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "MERN AI App",
        },
      }
    );

    const result =
      response.data?.choices?.[0]?.message?.content?.trim() ||
      "No response from AI";

    return res.status(200).json({ result });

  } catch (error: any) {
    console.error("AI ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Failed to fetch AI response",
    });
  }
};

// Save Data
export const saveData = async (req: Request, res: Response) => {
  try {
    const { prompt, response } = req.body;

    // Validation
    if (!prompt || !response) {
      return res.status(400).json({ error: "Missing data" });
    }

    const data = await AI.create({ prompt, response });

    return res.status(201).json(data);

  } catch (error) {
    console.error("DB ERROR:", error);

    return res.status(500).json({
      error: "Failed to save data",
    });
  }
};