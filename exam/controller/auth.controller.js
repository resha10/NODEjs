const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  await User.create(req.body);
  res.redirect("/login");
};

exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) return res.send("User Not Found");

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) return res.send("Incorrect Password");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "SECRET123",
    { expiresIn: "1d" }
  );

  res.cookie("token", token);
  res.redirect("/tasks");
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
