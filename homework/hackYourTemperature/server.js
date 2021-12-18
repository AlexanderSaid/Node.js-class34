import express from "express";
import keys from "./sources/keys.js"
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather/:cityName", (req, res) => {
  const cityName = req.body.cityName;
  
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
