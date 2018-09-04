const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    googleAccountEmailAddress: String,
    googleProfileId: String,
    googleDisplayName: String,
});

mongoose.model('users', userSchema);
