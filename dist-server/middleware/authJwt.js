"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _auth = _interopRequireDefault(require("../config/auth.js"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const User = _models.default.user;

const verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    let accessToken = req.cookies.accessToken;
    let refreshToken = req.cookies.refreshToken;

    if (!accessToken) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }

    _jsonwebtoken.default.verify(accessToken, _auth.default.secret, /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (err, decoded) {
        let id;

        if (err && err.name == "TokenExpiredError") {
          _jsonwebtoken.default.verify(refreshToken, _auth.default.secret, /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator(function* (err, decoded) {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!"
                });
              } else {
                id = decoded.id;

                const accessToken = _jsonwebtoken.default.sign({
                  id
                }, _auth.default.secret, {
                  expiresIn: 10
                });

                const refreshToken = _jsonwebtoken.default.sign({
                  id
                }, _auth.default.secret, {
                  expiresIn: "30d"
                });

                try {
                  const result = yield User.update({
                    refreshToken
                  }, {
                    where: {
                      id
                    }
                  });
                  res.locals.accessToken = accessToken;
                  res.locals.refreshToken = refreshToken;
                  req.userId = id;
                  next();
                } catch (err) {
                  console.log(error);
                }
              }
            });

            return function (_x6, _x7) {
              return _ref3.apply(this, arguments);
            };
          }());
        } else if (err) {
          return res.status(401).send({
            message: "Unauthorized!"
          });
        } else {
          req.userId = id;
          next();
        }
      });

      return function (_x4, _x5) {
        return _ref2.apply(this, arguments);
      };
    }());
  });

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = verifyToken;
exports.default = _default;