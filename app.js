const express = require("express");
const axios = require("axios");
const app = express();

require("dotenv").load();

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/forecast/:latLong", function(req, res, next) {
  axios
    .get(
      `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${
        req.params.latLong
      }?units=auto`
    )
    .then(resp => res.send(resp.data))
    .catch(next);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
