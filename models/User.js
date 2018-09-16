const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    googleAccountEmailAddress: String,
    googleProfileId: String,
    googleDisplayName: String,
    credits: { type: Number, default: 0 },
});

mongoose.model('users', userSchema);
