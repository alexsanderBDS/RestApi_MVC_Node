const express = require("express");
const router = new express.Router();
const { authUser } = require("../middleware/auth");

router.get("*", authUser, (req, res) => {
  res.render("./partials/errorPage", { user: req.userDecodedEmail });
});

module.exports = router;
