const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  assignedto: { type: String} ,
  category: { type: String },
  createdBy: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
