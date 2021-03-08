const clearCookie = (res, text) => {
  return new Promise((resolve, reject) => {
    if (res.cookie["auth-token"] !== "") {
      res.cookie("auth-token", "", {
        maxAge: 0,
        httpOnly: true,
      });
      resolve({ response: text });
    } else {
      reject({ error: "Error on try to delete user" });
    }
  });
};

module.exports = clearCookie;
