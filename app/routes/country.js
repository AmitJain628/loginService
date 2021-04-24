import  {verifyToken}  from "../middleware";
import {getCountry, getAllCountries, saveCountryData} from "../controllers/country";

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/country",
    [
        verifyToken
    ],
    saveCountryData
  );

  app.get(
    "/api/allCountry",
    [
        verifyToken
    ],
    getAllCountries
  );

  app.get(
    "/api/country",
    [
        verifyToken
    ],
    getCountry
  );

};
