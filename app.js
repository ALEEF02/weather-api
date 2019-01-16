const express = require("express");
const axios = require("axios");
const app = express();

require("dotenv").load();

const API_KEY = process.env.API_KEY;
const APPLICATION_KEY = process.env.APPLICATION_KEY;
const MAC_ADDRESS = process.env.MAC_ADDRESS;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/current/:limit", function(req, res, next) {
  axios
    .get(
        `https://api.ambientweather.net/v1/devices/${MAC_ADDRESS}?apiKey=${API_KEY}&applicationKey=${APPLICATION_KEY}&limit=${req.params.limit}`
    )
    .then(resp => res.send(resp.data))
    .catch(next);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
