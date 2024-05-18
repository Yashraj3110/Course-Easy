// Require Mongoose
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
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
  },
  password: {
    type: String,
  },
  profileImage: {
    type: String
  },
  UserID: {
    type: String,
    unique: true
  },
  googleId: {
    type: String,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Middleware to generate 
UserSchema.pre('save', function(next) {
  // Generate a unique UUID
  if (!this.UserID) {
    this.UserID = uuidv4();
  }
  next();
});

// Create and export User model
const User = mongoose.model('User', UserSchema);
module.exports = User;