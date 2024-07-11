import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

require("dotenv").config();

const app = express();
const port = 3001;
const baseUrl = process.env.VITE_API_BASE_URL || "";
const json = fs.readFileSync(path.join(__dirname, "data/videos.json"), "utf8");
const videos = JSON.parse(json.replace(/{baseUrl}/g, baseUrl));

app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/api/videos", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(videos);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
