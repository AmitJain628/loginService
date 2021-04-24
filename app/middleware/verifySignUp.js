import db from "../models";

const ROLES = db.ROLES;
const User = db.user;

const verifySignUp = async (req, res, next) => {
  try {
    const userExist = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (userExist) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }

    const email = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (email) {
      res.status(400).send({
        message: "Failed! Email is already in use!",
      });
      return;
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

export default verifySignUp;
