const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientId,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            const googleAccountEmailAddress = profile.emails.find(
                emailObject => emailObject.type === 'account'
            );
            const googleProfileId = profile.id;
            const googleDisplayName = profile.displayName;
            new User({
                googleAccountEmailAddress,
                googleProfileId,
                googleDisplayName,
            }).save();
        }
    )
);
