const Category = require("../model/category.model");

exports.create = async (req, res) => {
  await Category.create(req.body);
  res.redirect("/categories");
};
