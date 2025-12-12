const express = require('express');
const router = express.Router();
const {  login, getTasks, updateTask, updateProfile, getAllUsers } = require('../controller/auth.controller');
const { verifyToken } = require('../middleware/verifyToken');
const uploadImage = require("../middleware/uploadImage");

router.post('/login', login);
router.put('/update-profile/:id', verifyToken, uploadImage.single('profileImage'), updateProfile);

router.get("/view-users",getAllUsers)
router.get('/view-tasks', verifyToken, getTasks);
router.put('/update-task/:id', verifyToken, updateTask);
router.use('/admin', require('./admin.routes'));
module.exports = router;
