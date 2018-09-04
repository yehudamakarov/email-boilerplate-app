const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const PORT = process.env.PORT || 5000;
const app = express();
mongoose.connect(keys.mongoDBConnectionURI);

// Set up '/auth/google' and 'auth/google/callback'
require('./routes/authRoutes')(app);

// Make the User class
require('./models/User');

// Make the Google Strategy which is how we contact Google and where we make a User
require('./services/passport');

app.listen(PORT);
