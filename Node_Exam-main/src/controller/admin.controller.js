const bcrypt = require("bcrypt");
const Admin = require("../model/user.model");
const User = require("../model/user.model");
const sendMail = require("../config/sendMail");
const Task = require('../model/task.model');
exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, password, gender } = req.body;
    let imagePath = "";

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
      gender,
      profileImage: imagePath,
      role: "Admin",   
      isDelete: false
    });

    return res.status(201).json({ message: "Admin registered successfully", data: admin });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.addUser = async (req, res) => {
  try {
    let { firstname, lastname, email, password, gender, profileImage } = req.body;
    const plainPassword = password;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (req.file) {
      profileImage = `/uploads/${req.file.filename}`;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      email,
      gender,
      password: hashPassword,
      profileImage,
      role: "User",
      isDelete: false
    });
    const subject = "Your  Account Credentials";
    const html = `
      <h2>Welcome, ${firstname}!</h2>
      <p>Your  account has been created by the Admin.</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${plainPassword}</p>
      <p>Please login and change your password immediately.</p>
    `;
    await sendMail(email, subject, html);

    return res.status(201).json({ message: "User added successfully, email sent.", data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id, isDelete: false });
    if (!user) {
      return res.status(404).json({ message: "User not found or already deleted" });
    }

    await User.findByIdAndUpdate(id, { isDelete: true }, { new: true });

    return res.status(200).json({
      message: `User '${user.firstname} ${user.lastname}' deleted successfully`
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id, isDelete: false }).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User fetched successfully", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, gender, password } = req.body;

    const user = await User.findOne({ _id: id, isDelete: false });
    if (!user) return res.status(404).json({ message: "User not found" });

    let updatedData = { firstname, lastname, email, gender };

    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashPassword;
    }
    if (req.file) {
      updatedData.profileImage = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true }).select('-password');
    res.status(200).json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};






exports.addTask = async (req, res) => {
  try {
    const { title, description, status, assignedto, category } = req.body;
    const user = req.user;

    if (!title || !description) 
      return res.status(400).json({ message: 'Title and description required' });
    const assignedUser = await User.findOne({ firstname: assignedto });
    if (!assignedUser) 
      return res.status(404).json({ message: 'User not exists' });
    const task = await Task.create({
      title,
      description,
      status: status || 'Pending',
      assignedto: assignedUser.firstname,
      createdBy: user.firstname,
      category
    });

    res.status(201).json({ message: 'Task added successfully', data: task });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

