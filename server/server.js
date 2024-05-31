const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const cookieparser = require('cookie-parser');
const Razorpay = require("razorpay")
const bodyParser = require('body-parser');
require('dotenv').config({ path: './.env' });
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require("./model/UserSchema")

const MongoUri = process.env.MongoUri
const PORT = process.env.DBPORT;
const API_URL = process.env.REACT_APP_API_URL;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const app = express();

// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBSession({
    uri: process.env.MongoUri,
    collection: "Sessions"
});

app.use(session({
    secret: process.env.SESSION_SECRET, // Change this to a random string
    resave: false,
    saveUninitialized: false,
    store: mongoDBstore,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24, // Cookie expiry time in milliseconds (e.g., 1 day)
    }
}));

// Enable CORS for all routes
app.get("/", async (req, res) => {

    res.json("Hello");
});

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(express.json());
app.use(cookieparser());
app.use('/', require('./routes/authRoutes'))


/////////////////////////////////////////------------------------------------- Passport for google login
// Initialize Passport
app.use(passport.initialize());

// Configure Google OAuth 2.0 strategy
// Configure Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `/auth/google/callback`,
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if the user already exists in the database
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
            // User already exists, return the user
            done(null, user);
        } else {
            // User does not exist, create a new user object
            const newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                profileImage: profile.photos[0].value
            });

           

            // Save the new user to the database
            user = await newUser.save();
            done(null, user);
        }
    } catch (err) {
        // Handle errors
        done(err, null);
    }
}));

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user);
    
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
    done(null, user);
});




mongoose.connect(MongoUri)
    .then(() => {
        console.log("*DB Connected*")
        app.listen(PORT, () => console.log(`Server is running:${PORT}`))
    })

