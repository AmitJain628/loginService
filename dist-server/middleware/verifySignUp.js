"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const ROLES = _models.default.ROLES;
const User = _models.default.user;

const verifySignUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      const userExist = yield User.findOne({
        where: {
          username: req.body.username
        }
      });

      if (userExist) {
        res.status(400).send({
          message: "Failed! Username is already in use!"
        });
        return;
      }

      const email = yield User.findOne({
        where: {
          email: req.body.email
        }
      });

      if (email) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    } catch (err) {
      console.log(err);
    }
  });

  return function verifySignUp(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = verifySignUp;
exports.default = _default;