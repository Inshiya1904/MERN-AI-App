import axios from "axios";
import AI from "../models/aiModels.js";
export const askAI = async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model: "mistralai/mistral-7b-instruct:free",
            messages: [{ role: "user", content: prompt }],
        }, {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
        });
        const result = response.data.choices[0].message.content;
        res.json({ result });
    }
    catch (error) {
        res.status(500).json({ error: "AI Error" });
    }
};
export const saveData = async (req, res) => {
    const { prompt, response } = req.body;
    const data = await AI.create({ prompt, response });
    res.json(data);
};
