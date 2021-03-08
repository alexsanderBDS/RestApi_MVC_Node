const express = require("express");
const {
  userGet,
  userGetPosts,
  userDelete,
  postsGetID,
  postUpdate,
  postDelete,
} = require("../controllers/user");
const { auth } = require("../middleware/auth");

const router = new express.Router();

router.get("/", auth, userGet);

router.get("/posts", auth, userGetPosts);

router.get("/posts/update/:id", auth, postsGetID);
router.patch("/posts/update/:id", auth, postUpdate);

router.get("/posts/delete/:id", auth, postsGetID);
router.delete("/posts/delete/:id", auth, postDelete);

router.delete("/deleteAccount", auth, userDelete);

module.exports = router;
