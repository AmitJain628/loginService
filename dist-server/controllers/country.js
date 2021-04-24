"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountry = exports.getAllCountries = exports.saveCountryData = void 0;

var _models = _interopRequireDefault(require("../models"));

var _auth = _interopRequireDefault(require("../config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const Country = _models.default.country;

const saveCountryData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    const {
      countryName,
      gmtOffset
    } = req.body;

    try {
      let country = yield Country.create({
        countryName,
        gmtOffset
      });
      sendResponse(req, res, {
        message: "Country saved successfully!",
        country: country
      });
    } catch (err) {
      res.status(500).send({
        message: err.message
      });
    }
  });

  return function saveCountryData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.saveCountryData = saveCountryData;

const getAllCountries = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      let countries = yield Country.findAll();
      sendResponse(req, res, countries);
    } catch (err) {
      res.status(500).send({
        message: err.message
      });
    }
  });

  return function getAllCountries(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAllCountries = getAllCountries;

const getCountry = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    const {
      countryName
    } = req.query;

    try {
      let country = yield Country.findOne({
        where: {
          countryName
        }
      });
      sendResponse(req, res, country);
    } catch (err) {
      res.status(500).send({
        message: err.message
      });
    }
  });

  return function getCountry(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getCountry = getCountry;

const sendResponse = (req, res, response) => {
  if (res.locals.accessToken) {
    res.cookie("accessToken", res.locals.accessToken, {
      httpOnly: true
    }).cookie("refreshToken", res.locals.refreshToken, {
      httpOnly: true
    });
  }

  res.send(response);
};