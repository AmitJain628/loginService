import db from "../models";
import config from "../config/auth";

const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 8),
    });
    res.send({
      message: "User registered successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(404).send({
        message: "User Not found.",
      });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      config.secret,
      {
        expiresIn: 300,
      }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      config.secret,
      {
        expiresIn: "30d",
      }
    );

    const result = await User.update(
      {
        refreshToken,
      },
      {
        where: {
          username,
        },
      }
    );

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
      })
      .status(200)
      .send({
        id: user.id,
        username: user.username,
        email: user.email,
      });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getRefreshToken = async (req, res) => {
  const { username, refreshToken } = req.body;

  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(404).send({
        message: "User Not found.",
      });
    }

    if (user.refreshToken !== refreshToken) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Refresh token!",
      });
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      config.secret,
      {
        expiresIn: 300,
      }
    );
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
      })
      .status(200)
      .send({
        id: user.id,
        username: user.username,
        email: user.email,
      });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export { signin, signup, getRefreshToken };
