const mongoose = require('mongoose');
const savedVideoSchema = new mongoose.Schema({
    Lecture_title: {
        type: String,
        required: true
    },
    Lecture_url: {
        type: String,
        required: true
    },
    LectureID: {
        type: String,
        required: true
    }
    // Add more properties as needed
});

const SavedUserVideos = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    UserID: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    savedVideos: [savedVideoSchema]
});

const UserSavedVideos = mongoose.model('UserSavedVideos', SavedUserVideos);

module.exports = UserSavedVideos;
