const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const keys = require('./config/keys');

const PORT = process.env.PORT || 5000;

// Make passport serialize and deserialize to and from the session
const app = express();
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 6 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Connect to mongoDB
mongoose.connect(keys.mongoDBConnectionURI);

// Register the User model
require('./models/User');

// Make the Google Strategy which is how we contact Google and where we make a User
require('./services/passport');

// Set up '/auth/google' and 'auth/google/callback'
require('./routes/authRoutes')(app);

// Set up test routes
require('./routes/testRoutes')(app);

// Set up charge routes
require('./routes/chargeRoutes')(app);

app.listen(PORT);
