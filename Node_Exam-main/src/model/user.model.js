const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
  gender: {
    type: String,
    enum: ['Male', 'Female']
  },
  profileImage: String,
  role: {
    type: String,
    enum: ['Admin', 'User'],
    required: true
  },
  isDelete: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
 