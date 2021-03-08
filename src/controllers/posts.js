const Post = require("../models/posts");

const postsGet = async (req, res) => {
  const postsInDb = await Post.find({}).sort({ createdAt: -1 }).exec();
  res.render("./partials/posts", {
    postsInDb,
    create: true,
    update: false,
    user: req.userDecodedEmail,
  });
};

const postCreate = async (req, res) => {
  try {
    const result = await new Post({
      ...req.body,
      author: req.userDecodedEmail,
    }).save();
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send({ error: error });
  }
};

module.exports = { postsGet, postCreate };
