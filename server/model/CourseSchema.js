// Require Mongoose
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const CourseSchema = new mongoose.Schema({
    Course_title: {
        type: String,
        required: true
    },
    Course_desc: {
        type: String,
        required: true,
    },
    Course_field: {
        type: String,
        required: true,
    },
    Course_level: {
        type: String,
        required: true,
    },
    Course_price: {
        type: Number,
        required: true,
    },
    CourseImage: {
        type: String
    },
    EducatorID: {
        type: String
    },
    EducatorName: {
        type: String
    },
    CourseID: {
        type: String,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

CourseSchema.pre('save', function (next) {

    if (!this.CourseID) {
        this.CourseID = uuidv4();
    }
    next();
});

// Create and export User model
const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;