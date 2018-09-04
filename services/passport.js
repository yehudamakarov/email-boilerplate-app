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
        },
        (accessToken, refreshToken, profile, done) => {
            const googleAccountEmailAddress = profile.emails.find(
                emailObject => emailObject.type === 'account'
            ).value;
            const googleProfileId = profile.id;
            const googleDisplayName = profile.displayName;

            User.findOne({ googleProfileId }).then(existingUser => {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    new User({
                        googleAccountEmailAddress,
                        googleProfileId,
                        googleDisplayName,
                    })
                        .save()
                        .then(user => {
                            done(null, user);
                        });
                }
            });
        }
    )
);
