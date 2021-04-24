import db from "../models";
import config from "../config/auth";
import country from "../models";
const Country = db.country;

const saveCountryData = async (req, res) => {
  const { countryName, gmtOffset } = req.body;
  try {
    let country = await Country.create({
      countryName,
      gmtOffset,
    });
    sendResponse(req, res, {
      message: "Country saved successfully!",
      country: country,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllCountries = async (req, res) => {
  try {
    let countries = await Country.findAll();
    sendResponse(req, res, countries);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getCountry = async (req, res) => {
  const { countryName } = req.query;
  try {
    let country = await Country.findOne({
      where: {
        countryName,
      },
    });
    sendResponse(req, res, country);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const sendResponse = (req, res, response) => {
  if (res.locals.accessToken) {
    res
      .cookie("accessToken", res.locals.accessToken, { httpOnly: true })
      .cookie("refreshToken", res.locals.refreshToken, { httpOnly: true });
  }
  res.send(response);
};

export { saveCountryData, getAllCountries, getCountry };
