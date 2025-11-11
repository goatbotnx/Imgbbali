import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const IMGBB_KEY = "24e0b1032261b0bb68f36b071ef4c299"; // চাইলে imgbb.com থেকে নিয়ে দিও

app.get("/", (req, res) => {
  res.send("✅ IMGBB Uploader API is Running!");
});

app.post("/upload", async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: "No image URL provided" });
    }

    const uploadUrl = `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`;
    const response = await fetch(uploadUrl, {
      method: "POST",
      body: new URLSearchParams({ image })
    });

    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
