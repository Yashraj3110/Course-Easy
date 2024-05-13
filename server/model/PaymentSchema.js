const mongoose = require('mongoose');

// Define schema for payment data
const PaymentSchema = new mongoose.Schema({
    Razorpay_order_Id: {
        type: String,
        required: true
    },
    Razorpay_payment_Id: {
        type: String,
        required: true
    },
    Razorpay_signature: {
        type: String,
        required: true
    },
    CourseID: {
        type: String,
        required: true
    },
    CourseImage: {
        type: String,
        required: true
    },
    EducatorID: {
        type: String,
        required: true
    },
    EducatorName: {
        type: String,
        required: true
    },
    Course_level: {
        type: String,
        required: true
    },
    Course_title: {
        type: String,
        required: true
    },
    Course_desc: {
        type: String,
        required: true
    },
    UserID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true
    },
    // Add more fields as needed
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Create a model for the Payment schema
const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;