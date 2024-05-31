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
       
    },
    CourseID: {
        type: String,
        required: true
    },
    CourseImage: {
        type: String,
      
    },
    EducatorID: {
        type: String,
        
    },
    EducatorName: {
        type: String,
        
    },
    Course_level: {
        type: String,
        
    },
    Course_title: {
        type: String,
        
    },
    Course_desc: {
        type: String,
      
    },
    UserID: {
        type: String,
       
    },
    email: {
        type: String,
        
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