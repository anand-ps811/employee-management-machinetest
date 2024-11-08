const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  designation: String,
  gender: String,
  course: [String],
  createdDate: { type: Date, default: Date.now },
  image: String,
},{ timestamps: true});

module.exports = mongoose.model('Employee', EmployeeSchema);
