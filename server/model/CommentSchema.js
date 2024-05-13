// Require Mongoose
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    LectureID: {
        type: String,
        required: true,
    },
    CourseID: {
        type: String,
        required: true,
    },
    Lecture_title: {
        type: String,
        required: true
    },
    Lecture_url: {
        type: String,
        required: true,
    },
    Comment: {
        type: String,
        required: true,
    },
    UserName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});



// Create and export User model
const Comment = mongoose.model('Comments', CommentSchema);
module.exports = Comment;