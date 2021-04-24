import  {verifySignUp} from "../middleware";
import {signup, signin, getRefreshToken} from "../controllers/auth";

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp
    ],
    signup
  );

  app.post("/api/auth/signin", signin);
  app.get("/api/auth/refreshToken", getRefreshToken);
};
