"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRefreshToken = exports.signup = exports.signin = void 0;

var _models = _interopRequireDefault(require("../models"));

var _auth = _interopRequireDefault(require("../config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const User = _models.default.user;
const Role = _models.default.role;

var jwt = require("jsonwebtoken");

var bcrypt = require("bcryptjs");

const signup = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    const {
      username,
      email,
      password
    } = req.body;

    try {
      const user = yield User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 8)
      });
      res.send({
        message: "User registered successfully!"
      });
    } catch (err) {
      res.status(500).send({
        message: err.message
      });
    }
  });

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signup = signup;

const signin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    const {
      username,
      password
    } = req.body;

    try {
      const user = yield User.findOne({
        where: {
          username
        }
      });

      if (!user) {
        return res.status(404).send({
          message: "User Not found."
        });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const accessToken = jwt.sign({
        id: user.id
      }, _auth.default.secret, {
        expiresIn: 10
      });
      const refreshToken = jwt.sign({
        id: user.id
      }, _auth.default.secret, {
        expiresIn: "30d"
      });
      const result = yield User.update({
        refreshToken
      }, {
        where: {
          username
        }
      });
      res.cookie("accessToken", accessToken, {
        httpOnly: true
      }).cookie("refreshToken", refreshToken, {
        httpOnly: true
      }).status(200).send({
        id: user.id,
        username: user.username,
        email: user.email
      });
    } catch (err) {
      res.status(500).send({
        message: err.message
      });
    }
  });

  return function signin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signin = signin;

const getRefreshToken = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    const {
      username,
      refreshToken
    } = req.body;

    try {
      const user = yield User.findOne({
        where: {
          username
        }
      });

      if (!user) {
        return res.status(404).send({
          message: "User Not found."
        });
      }

      if (user.refreshToken !== refreshToken) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Refresh token!"
        });
      }

      const accessToken = jwt.sign({
        id: user.id
      }, _auth.default.secret, {
        expiresIn: 10
      });
      res.cookie("accessToken", accessToken, {
        httpOnly: true
      }).status(200).send({
        id: user.id,
        username: user.username,
        email: user.email
      });
    } catch (err) {
      res.status(500).send({
        message: err.message
      });
    }
  });

  return function getRefreshToken(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getRefreshToken = getRefreshToken;