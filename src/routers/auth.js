const express = require("express");
const { authUser } = require("../middleware/auth");
const router = new express.Router();
const {
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  logoutPost,
} = require("../controllers/auth");

router.get("/register", authUser, registerGet);
router.post("/register", registerPost);
router.get("/login", authUser, loginGet);
router.post("/login", loginPost);
router.post("/logout", logoutPost);

module.exports = router;
