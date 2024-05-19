const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const { v4: uuidv4 } = require('uuid');
const crypto = require("crypto")
const Educator = require("../model/EducatorSchema")
const User = require("../model/UserSchema")
const Course = require("../model/CourseSchema")
const Lecture = require("../model/lectureSchema");
const UsersComment = require("../model/CommentSchema")
const UsersavedVideo = require("../model/SavevideoSchema")
const razorpay = require('razorpay');
const Payment = require("../model/PaymentSchema")
const axios = require('axios');
const { Console } = require('console');

// Create a new MongoDBSession instance with your MongoDB URI and collection name
const store = new MongoDBSession({
    uri: process.env.MongoUri,
    collection: 'Sessions'
});



const sessionChecker = (req, res, next) => {
    // Check if session exists
    if (req.session && req.session.educator) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};


/// #############################################################################################################------------------  EDUCATOR ROUTES
router.post('/api/educator/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body.credentials;
        // Check if already exists
        let educator = await Educator.findOne({ email });
        if (educator) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new Educator document
        const newEducator = new Educator({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword
        });
        await newEducator.save();
        res.status(200).json({ message: 'Educator registered successfully' });
    } catch (error) {

        res.status(500).send('Server Error');
    }
});

router.post('/api/educator/login', async (req, res) => {
    try {
        const { email, password } = req.body.credentials;
        // Check if user exists
        let educator = await Educator.findOne({ email });
        if (!educator) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Check if session data for this user already exists
        const isMatch = await bcrypt.compare(password, educator.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const educatorData = {
            educatorID: educator.educatorID,
            name: educator.name,
            email: educator.email
        };

        res.json({ login: true, educatorData, msg: "Logged In Successfully" });
    } catch (error) {

        res.status(500).send('Server Error');
    }
});


router.delete('/api/educator/logout', (req, res) => {
    try {
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                res.status(500).json({ error: 'Logout failed' });
            } else {
                // Session destroyed successfully
                res.clearCookie('connect.sid'); // Clear the session cookie from the client
                res.status(200).json({ message: 'Logout successful' });
            }
        });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ error: 'Logout failed' });
    }
});


/// #############################################################################################################------------------  USER ROUTES
router.post('/api/user/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body.credentials;
        // Check if already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword
        });
        await newUser.save();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {

        res.status(500).send('Server Error');
    }
});

router.post('/api/user/login', async (req, res) => {
    try {
        const { email, password } = req.body.credentials;
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Check if session data for this user already exists
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const userData = {
            userID: user.UserID,
            name: user.name,
            email: user.email
        };


        res.json({ login: true, userData, msg: "Logged In Successfully" });
    } catch (error) {

        res.status(500).send('Server Error');
    }
});

/// #############################################################################################################------------------  COURSE ROUTES
router.post('/api/educator/course/create', async (req, res) => {
    try {

        const sessionData = req.body.sessionData;
        const Data = req.body;
        const newCourse = new Course({

            Course_title: Data.title,
            Course_desc: Data.desc,
            Course_field: Data.field,
            Course_level: Data.level,
            Course_price: Data.price,
            EducatorID: sessionData.educatorID,
            EducatorName: sessionData.name,
            CourseImage: Data.Thumbnail,
        });
        
        await newCourse.save();
        res.status(200).json({ message: 'Course' });
    } catch (error) {

        res.status(500).send('Server Error');
    }
});


router.post('/api/educator/lecture/create', async (req, res) => {
    try {
        const data = req.body;
        
        const course = req.body.selectedCourse;
       
        const thumbnail = req.body.Thumbnail;

        // const uniqueID = uuidv4();
        const newCourse = new Lecture({

            Lecture_title: data.title,
            Lecture_desc: data.desc,
            Lecture_url: data.lurl,
            Lecture_thumbnail: thumbnail,
            Course_price: data.price,
            Course_title: course.coursetitle,
            CourseID: course.courseID,
            EducatorID: course.educatorID,
        });
        await newCourse.save();
        res.status(200).json({ message: 'Lecture' });
    } catch (error) {

        res.status(500).send('Server Error');
    }
});

router.get("/api/educator/course/data", async (req, res) => {
    const { educatorID } = req.query;
    try {

        const courses = await Course.find({
            EducatorID: { $regex: '^' + educatorID }
        });
        res.status(200).json(courses);

    } catch (error) {
    }
});
router.get("/api/educator/lecture/data", async (req, res) => {
    const { educatorID } = req.query;
    try {

        const courses = await Lecture.find({
            EducatorID: educatorID
        });
        res.status(200).json(courses);

    } catch (error) {

    }
});

router.get('/api/lectures/course/:courseID', async (req, res) => {
    try {
        const courseID = req.params.courseID;
        // Find lectures associated with the selected course
        const lectures = await Lecture.find({ CourseID: courseID });
        res.json(lectures);
    } catch (error) {
        console.error('Error fetching lectures:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});
router.post('/api/educator/lecture/update', async (req, res) => {
    try {
        // Find the lecture based on LectureID
        const lecture = await Lecture.findOne({ LectureID: req.body.LectureID });

        // If lecture is not found, return 404 Not Found
        if (!lecture) {
            return res.status(404).json({ message: 'Lecture not found' });
        }

        // Update lecture title and description
        lecture.Lecture_title = req.body.Lecture_title;
        lecture.Lecture_desc = req.body.Lecture_desc;
        lecture.Lecture_url = req.body.Lecture_url;

        // Save the updated lecture
        await lecture.save();

        // Return success response
        res.status(200).json({ message: 'Lecture updated successfully' });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error updating lecture:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/api/educator/lecture/Delete/:lectureId', async (req, res) => {
    const lectureId = req.params.lectureId;

    const lecture = await Lecture.deleteOne({
        LectureID: lectureId
    });
    res.status(200).json({ message: 'Lecture Deleted' });
});
router.post('/api/educator/course/Delete/:CourseId', async (req, res) => {
    const CourseId = req.params.CourseId;

    const course = await Course.deleteOne({
        CourseID: CourseId
    });
    res.status(200).json({ message: 'Course Deleted' });
});
router.post('/api/educator/Course/update', async (req, res) => {
    try {
        const Data = (req.body);
        const educatorname = (req.body.SessionData.name);
        const CourseId = (req.body.CourseID);
       

        // Find the lecture based on LectureID
        const course = await Course.findOne({ CourseID: CourseId });
        // If lecture is not found, return 404 Not Found
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        if (req.body.Thumbnail == null) {
            image = course.CourseImage;
        } else {
            image = Data.Thumbnail;
        }

        // Update lecture title and description
        course.Course_title = Data.Course_title,
            course.Course_desc = Data.Course_desc,
            course.Course_level = Data.Course_level,
            course.Course_price = Data.Course_price,
            course.CourseImage = image,
            course.EducatorName = educatorname,

            // Save the updated lecture
            await course.save();

        // Return success response
        res.status(200).json({ message: 'course updated successfully' });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error updating lecture:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/// #############################################################################################################------------------  Public ROUTES
router.get("/api/courses/data/:topic", async (req, res) => {
    const Topic = (req.params.topic);
    const Courses = await Course.find({ Course_field: Topic });
    if (Courses) {
        res.status(200).json(Courses);
    }
});
router.get("/api/course/data/:Id", async (req, res) => {
    const Id = (req.params.Id);
    const Coursed = await Course.find({ CourseID: Id });
    if (Coursed) {
        res.status(200).json(Coursed);
    }
});
router.get("/api/public/course/lecture/:Id", async (req, res) => {
    const ID = (req.params.Id);
    const lectures = await Lecture.find({ CourseID: ID });
    res.status(200).json(lectures);

});
router.get("/api/public/course/lecture/comments/:Id", async (req, res) => {
    const ID = (req.params.Id);
    const Comments = await UsersComment.find({ LectureID: ID });
    res.status(200).json(Comments);

});

router.get("/api/search", async (req, res) => {
    try {
        const { q } = req.query;
        const courseResults = await Course.find({ Course_title: { $regex: q, $options: 'i' } }); // Case-insensitive search
        const lectureResults = await Lecture.find({ Lecture_title: { $regex: q, $options: 'i' } }); // Case-insensitive search
        res.json({ courses: courseResults, lectures: lectureResults });
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/// ##########################################################################################------------------  Google

// Google OAuth 2.0 authentication route
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', "profile", 'email'] })
);

// Google OAuth 2.0 callback route
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, store user data in session
        let userData = req.user;
        req.session.user = userData;


        // Send user data back to the client
        res.redirect(`http://localhost:3000/auth/google/success?userData=${encodeURIComponent(JSON.stringify(userData))}`);
    }
);

/// ##########################################################################################------------------  Lecture page

router.post('/api/lecture/comment', async (req, res) => {
    const data = req.body.ComData
    try {

        const Cdata = {
            LectureID: data.LectureId,
            CourseID: data.CourseID,
            Lecture_title: data.Lecture_title,
            Lecture_url: data.Lecture_url,
            Comment: data.comment,
            UserName: data.userName
        }
        const newComData = new UsersComment(Cdata);

        // Save it to the database
        await newComData.save();
        res.status(201).send("Comment Saved")
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
});
router.post('/api/lecture/save', async (req, res) => {
    // const { name, email, UserID } = req.body.user
    // const lecture = req.body.lecture
    try {
        const { lecture, user } = req.body;

        // Prepare lecture data
        const lectureData = {
            Lecture_title: lecture.Lecture_title,
            Lecture_url: lecture.Lecture_url,
            LectureID: lecture.LectureID,
            CourseID: lecture.CourseID // Include CourseID for matching
        };

        // Prepare user data
        const userData = {
            username: user.name,
            email: user.email,
            UserID: user.UserID,
            CourseID: lecture.CourseID // Include CourseID for matching
        };

        // Check if a similar document exists for the user and course combination
        UsersavedVideo.findOne({ UserID: userData.UserID, courseId: userData.CourseID })
            .then(existingDocument => {
                if (existingDocument) {
                    // Check if the lecture with the same LectureID already exists in savedVideos array
                    const isLectureExists = existingDocument.savedVideos.some(savedVideo =>
                        savedVideo.LectureID === lectureData.LectureID
                    );

                    if (!isLectureExists) {
                        // If the lecture doesn't exist, append the new lecture to the savedVideos array
                        existingDocument.savedVideos.push(lectureData);
                        return existingDocument.save();
                    }
                    // If the lecture already exists, return without making any changes
                    return existingDocument;
                } else {
                    // If no document exists, create a new one with the user and course data
                    const newUserSavedVideos = new UsersavedVideo({
                        username: userData.username,
                        email: userData.email,
                        UserID: userData.UserID,
                        courseId: userData.CourseID,
                        savedVideos: [lectureData] // Add the lecture data to the savedVideos array
                    });
                    return newUserSavedVideos.save();
                }
            })
            .then(savedDocument => {

                res.status(201).send('Video saved');
                // Respond with success message or any other necessary action
            })
            .catch(error => {
                console.error('Error saving user videos:', error);
                // Respond with error message or handle the error accordingly
            });


    } catch (error) {

        res.status(500).send('Server Error');
    }
});
router.post('/api/lecture/remove', async (req, res) => {
    // const { name, email, UserID } = req.body.user
    // const lecture = req.body.lecture
    try {
        const { lecture, user } = req.body;
        try {
            // Define the filter criteria
            const filter = {
                UserID: user.UserID, // Match by user ID
                courseId: lecture.CourseID // Match by course ID
            };

            // Define the update operation using $pull to remove the specified lecture
            const updateOperation = {
                $pull: {
                    savedVideos: { LectureID: lecture.LectureID } // Remove lecture with matching LectureID
                }
            };

            // Use findOneAndUpdate to find the matching document and remove the lecture
            const updatedDocument = await UsersavedVideo.findOneAndUpdate(filter, updateOperation, { new: true });

            if (!updatedDocument) {
                // If no document is found, return a 404 Not Found response
                return res.status(404).json({ message: 'Document not found' });
            }

            // Respond with the updated document or any other necessary action
            res.json({ message: 'Lecture removed successfully', updatedDocument });
        } catch (error) {
            // Log the error and send a 500 Internal Server Error response
            console.error(error);
            res.status(500).send('Server Error');
        }
    } catch (error) {

        res.status(500).send('Server Error');
    }
});

router.get('/api/lecture/check', async (req, res) => {
    try {
        const { userID, lectureID } = req.query;

        if (!userID || !lectureID) {
            return res.status(400).json({ saved: false, message: 'UserID and LectureID are required' });
        }

        const user = await UsersavedVideo.findOne({ UserID: userID, 'savedVideos.LectureID': lectureID });

        if (user) {
            res.status(200).json({ saved: true });
        } else {
            res.status(200).json({ saved: false });
        }
    } catch (error) {
        console.error('Error checking saved video:', error);
        res.status(500).send('Server Error');
    }
});
/// ##########################################################################################------------------  Payment intigration

const instance = new razorpay({
    key_id: process.env.RAZOR_API_ID,
    key_secret: process.env.RAZOR_API_KEY
});

router.post('/api/payment/checkout', async (req, res) => {

    try {
        const { Course, User } = req.body;
        const options = {
            amount: Course.Course_price + "00",
            currency: "INR",
            notes: {
                CourseID: Course.CourseID,
                EducatorID: Course.EducatorID,
                Username: User.name,
                UserID: User.UserID,
            }
        };
        const order = await instance.orders.create(options)
        res.status(200).json({
            success: true, order
        });
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
});

router.post('/api/paymentverification', async (req, res) => {

    try {

        const { Course, sessionData } = req.query;

        // Parse the JSON strings
        const parsedSession = JSON.parse(sessionData);
        const parsedCourse = JSON.parse(Course);

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedsgnature = crypto.createHmac('sha256', process.env.RAZOR_API_KEY).update(body.toString()).digest('hex')

        const isauth = expectedsgnature === razorpay_signature;

        if (isauth) {

            const existingpayment = await Payment.findOne({ UserID: parsedSession.UserID, CourseID: parsedCourse.CourseID });
            if (existingpayment) {
                res.redirect(`http://localhost:3000/course/${parsedCourse.CourseID}`)
            }
            else {
                const newPayment = new Payment({
                    Razorpay_order_Id: razorpay_order_id,
                    Razorpay_payment_Id: razorpay_payment_id,
                    Razorpay_signature: razorpay_signature,
                    CourseID: parsedCourse.CourseID,
                    CourseImage: parsedCourse.CourseImage,
                    EducatorID: parsedCourse.EducatorID,
                    EducatorName: parsedCourse.EducatorName,
                    Course_level: parsedCourse.Course_level,
                    Course_title: parsedCourse.Course_title,
                    Course_desc: parsedCourse.Course_desc,
                    UserID: parsedSession.UserID,
                    Username: parsedSession.name,
                    email: parsedSession.email,

                });
                newPayment.save();
                res.redirect(`http://localhost:3000/course/${parsedCourse.CourseID}`)

            }

        }
        else {
            res.status(400).json({ success: false });

            console.log(error)
        }
    } catch (error) {

        res.status(500).send('Server Error');
    }
});

router.get('/api/check/payment', async (req, res) => {

    try {
        const data = req.query.User;
        const course = req.query.Course;


        // Find payment records based on UserID and CourseID
        const exdata = await Payment.find({ UserID: data.UserID, CourseID: course.CourseID });

        if (exdata.length > 0) {
            res.status(200).json(exdata);
        } else {
            res.status(202).json({ success: false, message: 'No payment records found for the user and course' });
        }

    } catch (error) {

        res.status(500).send('Server Error');
    }
});
router.get('/api/purchased/courses/data', async (req, res) => {

    try {
        const data = req.query.userID;

        // Find payment records based on UserID and CourseID
        const exdata = await Payment.find({ UserID: data.UserID });

        if (exdata.length > 0) {
            res.status(200).json(exdata);
        } else {
            res.status(202).json({ success: false, message: 'No payment records found for the user and course' });
        }

    } catch (error) {

        res.status(500).send('Server Error');
    }
});
router.get('/api/saved/lectures', async (req, res) => {

    try {
        const data = req.query.userID;

        // Find payment records based on UserID and CourseID
        const exdata = await UsersavedVideo.find({ UserID: data.UserID });

        if (exdata.length > 0) {
            res.status(200).json(exdata);
        } else {
            res.status(202).json({ success: false, message: 'No payment records found for the user and course' });
        }

    } catch (error) {

        res.status(500).send('Server Error');
    }
});
router.get('/api/course/details', async (req, res) => {

    try {


        // Find payment records based on UserID and CourseID
        const exdata = await Course.find();

        if (exdata.length > 0) {
            res.status(200).json(exdata);
        } else {
            res.status(202).json({ success: false, message: 'No payment records found for the user and course' });
        }

    } catch (error) {

        res.status(500).send('Server Error');
    }
});
module.exports = router;