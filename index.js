const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

const PORT = process.env.PORT || 5000;
const app = express();

// Make passport serialize and deserialize to and from the session
app.use(
    cookieSession({
        maxAge: 6 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoDBConnectionURI);

// Set up '/auth/google' and 'auth/google/callback'
require('./routes/authRoutes')(app);

// Make the User class
require('./models/User');

// Make the Google Strategy which is how we contact Google and where we make a User
require('./services/passport');

app.listen(PORT);
