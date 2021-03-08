const jwt = require("jsonwebtoken");
const User = require("../models/users");
const moment = require("moment");
const bcrypt = require("bcrypt");
const clearCookie = require("../utils/clearCookie");

const generateToken = async (response, _id) => {
  let miliseconds = process.env.MILISECONDS;
  let diff = new moment.duration(miliseconds);

  const token = await jwt.sign({ _id }, process.env.SECRET_KEY, {
    expiresIn: `${diff.asDays()}d`,
  });

  diff = undefined;

  response.cookie("auth-token", token, {
    maxAge: miliseconds,
    httpOnly: true,
  });

  return token;
};

const registerGet = (req, res) => {
  if (!req.userDecodedEmail) {
    res.render("auth/form", {
      title: "Bla Bla Bla | Register",
      user: req.userDecodedEmail,
    });
  } else {
    res.send({ error: "Unauthorized" });
  }
};

const registerPost = async (req, res) => {
  try {
    const user = await new User({
      email: req.body.email,
      password: req.body.password,
    }).save();
    const token = await generateToken(res, user._id);

    // console.log(token);
    res.redirect("/posts");
  } catch (error) {
    res.send(error);
  }
};

const loginGet = (req, res) => {
  if (!req.userDecodedEmail) {
    res.render("auth/form", {
      title: "Bla Bla Bla | Login",
      user: req.userDecodedEmail,
    });
  } else {
    res.send({ error: "Unauthorized" });
  }
};

const loginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userStored = await User.findOne({ email });

    if (!userStored) {
      return res.send("User doesn't exist!");
    }

    const match = await bcrypt.compare(password, userStored.password);

    if (match) {
      const token = await generateToken(res, userStored._id);
      res.send({ token });
    } else {
      res.send({ error: "email or password wrong!" });
    }
  } catch (error) {
    res.send(error);
  }
};

logoutPost = async (req, res) => {
  const response = await clearCookie(res, "Success logout");
  res.status(200).send(response);
};

module.exports = { registerGet, registerPost, loginGet, loginPost, logoutPost };
