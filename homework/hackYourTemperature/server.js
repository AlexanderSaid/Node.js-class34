'use strict'

import express from "express";
import {keys} from "./sources/keys.js"
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", async(req, res) => {
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  const cityName = req.body.cityName;
  const units = "metric"
  const endpoint = `${baseUrl}?q=${cityName}&appid=${keys.API_KEY}&units=${units}`;
  const response = await fetch(endpoint);
  if(!response.ok) throw new Error ('Request Failed!')
  const data = await response.json()
  res.send(`It's ${data.main.temp} degrees in ${req.body.cityName} right now`)
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
