"use strict";

var _middleware = require("../middleware");

var _auth = require("../controllers/auth");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });
  app.post("/api/auth/signup", [_middleware.verifySignUp], _auth.signup);
  app.post("/api/auth/signin", _auth.signin);
  app.get("/api/auth/refreshToken", _auth.getRefreshToken);
};