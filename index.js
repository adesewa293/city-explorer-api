const express = require("express");
const weatherData = require("./data/weather.json");
const cors = require("cors");

require("dotenv").config();

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
  const searchQuery = req.query.searchQuery;
  const foundCity = weatherData.find((city) => {
    return (
      city.city_name === searchQuery &&
      city.lat.toString() === lat &&
      city.lon.toString() === lon
    );
  });

  if (foundCity) {
    const result = foundCity.data.map((info) => {
      const forecast = new Forecast(info.datetime, info.weather.description);
      return forecast;
    });
    res.send(result);
  } else {
    res.status(404).send({
      error: `City => ${searchQuery}, ${lat}, ${lon} not found`,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
