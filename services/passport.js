const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientId,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            const googleDisplayName = profile.displayName;
            const googleAccountEmailAddress = profile.emails.find(emailObject => emailObject.type === 'account').value;
            const googleProfileId = profile.id;

            const existingUser = await User.findOne({ googleProfileId });
            if (existingUser) {
                return done(null, existingUser);
            }
            const user = await new User({
                googleAccountEmailAddress,
                googleProfileId,
                googleDisplayName,
            }).save();
            return done(null, user);
        }
    )
);
