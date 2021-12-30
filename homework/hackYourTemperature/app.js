"use strict";

import express from "express";
import { keys } from "./sources/keys.js";
import fetch from "node-fetch";
import { engine } from 'express-handlebars';


const app = express();
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get("/", (req, res) => {
  res.render('index');
});

app.post("/weather", async (req, res) => {
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  const cityName = req.body.cityName;
  const units = "metric";
  const endpoint = `${baseUrl}?q=${cityName}&appid=${keys.API_KEY}&units=${units}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    if (cityName === "") {
      res.status(response.status);
      res.render('index', { weatherText: "No city name has been send" });
      return;
    } else {
      res.status(response.status);
      res.render('index', { weatherText: "City is not found" });
      return;
    }
  }
  const data = await response.json();
  res.render('index', { weatherText: `${cityName}: ${Math.round(data.main.temp)}` });
});

export default app;
