const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

module.exports = app;
