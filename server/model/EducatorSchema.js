// Require Mongoose
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const EducatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String
  },
  educatorID: {
    type: String,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Middleware to generate unique educatorID before saving the document
EducatorSchema.pre('save', function(next) {
  // Generate a unique UUID as the educatorID
  if (!this.educatorID) {
    this.educatorID = uuidv4();
  }
  next();
});

// Create and export User model
const Educator = mongoose.model('Educator', EducatorSchema);
module.exports = Educator;