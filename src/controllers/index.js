const homePage = (req, res) => {
  res.render("index", { title: "Home", user: req.userDecodedEmail });
};

const aboutPage = (req, res) => {
  res.render("about", { title: "About", user: req.userDecodedEmail });
};

const homePagePost = (req, res) => {
  console.log(req.body);
};

module.exports = { homePage, aboutPage, homePagePost };
