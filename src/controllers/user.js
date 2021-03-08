const Post = require("../models/posts");
const User = require("../models/users");
const clearCookie = require("../utils/clearCookie");

const userGet = async (req, res) => {
  const lastPostCreated = await Post.find({
    author: req.userDecodedEmail,
  }).sort({ createdAt: 0 });
  const lastPostUpdated = await Post.find({
    author: req.userDecodedEmail,
  }).sort({ updatedAt: -1 });

  const postsInDb = [lastPostCreated[0], lastPostUpdated[0]];
  res.render("./partials/profile", { user: req.userDecodedEmail, postsInDb });
};

const userGetPosts = async ({ userDecodedEmail }, res) => {
  const postsInDb = await Post.find({ author: userDecodedEmail })
    .sort({ updatedAt: -1 })
    .exec();

  if (postsInDb.length === 0) {
    return res.render("./partials/noPosts", { user: userDecodedEmail });
  }

  res.render("./partials/posts", {
    create: false,
    update: false,
    delete: false,
    postsInDb,
    user: userDecodedEmail,
  });
};

const userDelete = async ({ userDecodedEmail }, res) => {
  const user = await User.findOneAndDelete({ email: userDecodedEmail });
  await Post.deleteMany({ author: user.email });
  const result = await clearCookie(res, "User and all it posts deleted");

  res.status(200).send();
};

const postsGetID = async (req, res) => {
  let activate = true;

  const postsInDb = await Post.findOne({
    _id: req.params.id,
    author: req.userDecodedEmail,
  });

  if (req.originalUrl.includes("delete")) {
    activate = false;
  }

  res.render("./partials/blank", {
    user: req.userDecodedEmail,
    update: activate,
    create: false,
    postsInDb,
  });
};

const postUpdate = async (req, res) => {
  try {
    const updated = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.userDecodedEmail },
      {
        title: req.body.title,
        body: req.body.body,
        author: req.userDecodedEmail,
      },
      { new: true }
    );

    res.send(req.userDecodedEmail);
  } catch (error) {
    res.send(error);
  }
};

const postDelete = async (req, res) => {
  const deleted = await Post.findOneAndDelete({
    _id: req.params.id,
    author: req.userDecodedEmail,
  });

  res.send(deleted);
};

module.exports = {
  userGet,
  userGetPosts,
  userDelete,
  postsGetID,
  postUpdate,
  postDelete,
};
