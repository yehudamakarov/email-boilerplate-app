module.exports = app => {
    app.get('/api/current_user', (req, res) => {
        if (req.user) {
            return res.send(req.user);
        }
        return res.send({ error: 'Authorization attempt failed' });
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send({ message: 'Logged Out' });
    });
};
