const express = require('express');
const { addUser, deleteUser, register, addTask, updateUser, getUser} = require('../controller/admin.controller');

const routes = express.Router();
const uploadImage = require("../middleware/uploadImage");
const { verifyToken, verifyRole } = require('../middleware/verifyToken');
routes.post("/register", uploadImage.single('profileImage'), register);
routes.post("/add-user", verifyToken, verifyRole('admin'), uploadImage.single('profileImage'), addUser);
routes.post("/add-task", verifyToken, verifyRole('admin'), uploadImage.single('profileImage'), addTask);
routes.get("/view-user/:id",  getUser);
routes.delete("/delete-user/:id", verifyToken, verifyRole('admin'), deleteUser);
routes.put("/update-user/:id", verifyToken, verifyRole('admin'), uploadImage.single('profileImage'), updateUser);

module.exports = routes;
