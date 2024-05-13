// Require Mongoose
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const LectureSchema = new mongoose.Schema({
    Lecture_title: {
        type: String,
        required: true
    },
    Course_title: {
        type: String,
        required: true
    },
    Lecture_desc: {
        type: String,
        required: true,
    },
    Lecture_url: {
        type: String,
        required: true,
    },
    Lecture_thumbnail: {
        type: String,
        required: true,
    },
    EducatorID: {
        type: String,
        required: true,
    },
    LectureID: {
        type: String,
        unique: true
    },
    CourseID: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

LectureSchema.pre('save', function (next) {

    if (!this.LectureID) {
        this.LectureID = uuidv4();
    }
    next();
});

// Create and export User model
const Lecture = mongoose.model('Lectures', LectureSchema);
module.exports = Lecture;