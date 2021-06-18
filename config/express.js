const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const consign = require("consign");
var cors = require('cors')

module.exports = () => {
  const app = express();
  app.set("port", process.env.PORT || config.get("server.port"));
  app.use(bodyParser.json());
  app.use(cors());
  consign({cwd: 'src'})
    .then('services')
    .then('controllers')
    .then('routes')
    .into(app)

  return app;
};
