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
require('./routes/apiRoutes')(app);

// Set up charge routes
require('./routes/chargeRoutes')(app);


if (process.env.NODE_ENV === 'production') {
    // if the index.html file requests, static/main.js etc. - automatically
    // prepend client/build. Any get requests not recognized will go through
    // this.
    app.use(express.static('client/build'));
    // If there were no matches, the client must have been needing to run the
    // URL through React Router or something. send the index file from the build
    // folder
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(PORT);
