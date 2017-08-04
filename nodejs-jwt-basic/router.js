let _express = require('express');
let _authenticateManager = require('./authenticateManager');

let _router = _express.Router();

_router.post('/login', function (req, res) {
    let username = req.body.username || '';
    let password = req.body.password || '';
    let isValid = _authenticateManager.validateLogin(username, password);
    if (isValid) {
        let tokenWrapper = _authenticateManager.generateToken(username);
        res.json(tokenWrapper);
    } else {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid credentials"
        });
    }
});

_router.post('/free/items', function (req, res) {
    var items = [
        { id: 1, name: 'free item1' },
        { id: 2, name: 'free item2' },
        { id: 3, name: 'free item3' }
    ];
    res.json(items);
});

_router.post('/premium/items', function (req, res) {
    var items = [
        { id: 1, name: 'premium item1' },
        { id: 2, name: 'premium item2' },
        { id: 3, name: 'premium item3' }
    ];
    res.json(items);
});

module.exports = _router;