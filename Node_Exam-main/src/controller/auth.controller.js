const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Task = require('../model/task.model');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
  

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All password fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New password and confirm password do not match" });
    }
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

    if (oldPassword === newPassword) {
      return res.status(400).json({ message: "New password must be different from old password" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error changing password", error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (!loggedInUser) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.params; 
    let targetUser;

    if (loggedInUser.role.toLowerCase() === 'admin') {
  
      targetUser = await User.findOne({ _id: id, isDelete: false });
      if (!targetUser) return res.status(404).json({ message: 'User not found' });
    } else {
      
      if (loggedInUser._id.toString() !== id) {
        return res.status(403).json({ message: 'Forbidden: Cannot update other users' });
      }
      targetUser = loggedInUser;
    }


    const { firstname, lastname, email, gender, password } = req.body;

    let updatedData = { firstname, lastname, email, gender };

    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashPassword;
    }

  
    if (req.file) {
      updatedData.profileImage = `/uploads/${req.file.filename}`;
    }

   
    const updatedUser = await User.findByIdAndUpdate(targetUser._id, updatedData, { new: true }).select('-password');

    return res.status(200).json({
      message: 'Profile updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Update Profile Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isDelete: false }).select('-password');
    res.status(200).json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getTasks = async (req, res) => {
  try {
    const user = req.user; 
    let tasks;

    if (user.role === 'Admin') {
      tasks = await Task.find().populate('createdBy', 'username email role');
    } else {
      tasks = await Task.find({ createdBy: user.firstname});
    }

    res.status(200).json({ message: 'Tasks fetched', data: tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.updateTask = async (req, res) => {
  try {
    const user = req.user; 
    const taskId = req.params.id;
    const { title, description, status, category, assignedto } = req.body || {};
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (user.role !== 'Admin' && task.createdBy.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'You are not allowed to update this task' });
    }
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (status) updateData.status = status;
    if (category) updateData.category = category;
    if (assignedto) updateData.assignedto = assignedto; 
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true })
      .populate('createdBy', 'username email')
      .populate('assignedto', 'username email');

    res.status(200).json({ message: 'Task updated successfully', data: updatedTask });
  } catch (error) {
    console.error('Update Task Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};





