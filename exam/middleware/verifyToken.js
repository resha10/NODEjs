const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect("/login");
    }

    const decoded = jwt.verify(token, "SECRET123");
    req.user = decoded;

    next();
  } catch (err) {
    return res.redirect("/login");
  }
};
