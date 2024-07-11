import express from "express";
import cors from "cors";
import path from "path";
import videos from "./data/videos.json";

const app = express();
const port = 3001;

app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/api/videos", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(videos);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
