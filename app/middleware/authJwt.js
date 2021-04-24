import jwt from "jsonwebtoken";
import config from "../config/auth.js";
import db from "../models";
const User = db.user;

const verifyToken = async (req, res, next) => {
  let accessToken = req.cookies.accessToken;
  let refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(accessToken, config.secret, async (err, decoded) => {
    let id;
    if (err && err.name == "TokenExpiredError") {
      jwt.verify(refreshToken, config.secret, async (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!",
          });
        } else {
          id = decoded.id;
          const accessToken = jwt.sign({ id }, config.secret, {
            expiresIn: 10,
          });

          const refreshToken = jwt.sign({ id }, config.secret, {
            expiresIn: "30d",
          });

          try {
            const result = await User.update(
              { refreshToken },
              { where: { id } }
            );

            res.locals.accessToken = accessToken;
            res.locals.refreshToken = refreshToken;
            req.userId = id;
            next();
          } catch (err) {
            console.log(error);
          }
        }
      });
    } else if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    } else {
      req.userId = id;
      next();
    }
  });
};

export default verifyToken;
