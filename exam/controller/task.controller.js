const Task = require("../model/task.model");

exports.list = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).populate("category");
  res.render("taskList", { tasks, user: req.user });
};

exports.create = async (req, res) => {
  await Task.create({ ...req.body, user: req.user.id });
  res.redirect("/tasks");
};

exports.update = async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/tasks");
};

exports.delete = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect("/tasks");
};
