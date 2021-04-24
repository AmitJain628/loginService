"use strict";

var _middleware = require("../middleware");

var _country = require("../controllers/country");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });
  app.post("/api/country", [_middleware.verifyToken], _country.saveCountryData);
  app.get("/api/allCountry", [_middleware.verifyToken], _country.getAllCountries);
  app.get("/api/country", [_middleware.verifyToken], _country.getCountry);
};