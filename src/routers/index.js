const express = require("express");
const { homePage, aboutPage, homePagePost } = require("../controllers/index");
const { authUser } = require("../middleware/auth");

const router = new express.Router();

router.get("/", authUser, homePage);
router.post("/", homePagePost);
router.get("/about", authUser, aboutPage);

module.exports = router;
