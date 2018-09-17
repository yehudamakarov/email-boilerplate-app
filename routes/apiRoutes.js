module.exports = app => {
    app.get('/api/current_user', (req, res) => res.send(req.user));
};
