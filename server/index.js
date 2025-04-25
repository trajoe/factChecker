import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Fact Checker API! Use POST /check-fact to check statements.");
});

const openai = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: process.env['GITHUB_TOKEN'],  
  });

app.post("/check-fact", async(req, res) => {
    const {statement} = req.body;

try {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content:
                "You are a fact-checking assistant. Check the statement for accuracy, provide a verdict (True, False, or Unclear), and explain briefly.",
            },
            {
                role: "user",
                content: statement,
            },
        ],
    });

    res.json({result: response.choices[0].message.content});
} catch (err) {
    console.log(err);
    res.status(500).send("Error checking fact");
}
});

app.listen(5000, () => console.log("Server running on port 5000"));
