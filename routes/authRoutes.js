const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email',
            ],
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        // success or fail?
        // see passport docs
        res.redirect('/');
    });

    app.get('/api/logout', (req, res) => {
        console.log('worked');
        req.logout();
        res.redirect('/');
    });
};
