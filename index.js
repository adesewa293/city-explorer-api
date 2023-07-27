const express = require("express");
// const weatherData = require("./data/weather.json");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const ACCESS_KEY = process.env.WEATHER_API_KEY;

const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

function Forecast(date, description) {
  this.date = date;
  this.description = description;
}

app.get("/weather", (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  //  console.log(lat, lon)
  axios
    .get(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${ACCESS_KEY}`
    )
    .then((response) => {
      const weatherData = response.data.data.map((item) => {
        const forecast = new Forecast(
          item.datetime,
          `Low of ${item.app_min_temp}, high of ${item.app_max_temp} with ${item.weather.description}`
        );
        return forecast;
      });
      res.send(weatherData);
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).send({error: "opps"});
    });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
