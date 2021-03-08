const jwt = require("jsonwebtoken");
const User = require("../models/users");

const auth = async (req, res, next) => {
  const token = req.cookies["auth-token"];

  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      await User.findOne({ _id: decoded._id }).then(({ email }) => {
        req.userDecodedEmail = email;
      });
      next();
    } catch (error) {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
    // res.send({ error: "Unauthorized!" });
  }
};

const authUser = async (req, res, next) => {
  const token = req.cookies["auth-token"];

  try {
    if (token) {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findOne({ _id: decoded._id }).then(
        ({ email }) => {
          req.userDecodedEmail = email;
        }
      );
    }
    next();
  } catch (error) {
    next();
  }
};

module.exports = { auth, authUser };
