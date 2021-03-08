const { postsGet, postCreate } = require("../controllers/posts");
const { auth } = require("../middleware/auth");

const express = require("express");

const router = new express.Router();

router.get("/", auth, postsGet);
// router.get("/update/:id", auth, postsGetID);
router.post("/create", auth, postCreate);
// router.patch("/update/:id", auth, postUpdate);
// router.delete("/delete/:id", auth, postDelete);

module.exports = router;
