function validateRequest(req, res, next) {
    let jwt = require('jwt-simple');
    let authenticateManager = require('./authenticateManager');

    let token = (req.body && req.body.token);
    let username = (req.body && req.body.username);
    if (token && username) {
        let isUserValid = authenticateManager.validateUser(username);
        if (isUserValid) {
            let isTokenValid = authenticateManager.validateToken(token, username);
            if (isTokenValid) {
                next();
            } else {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid Token / Token Expired"
                });
                return;
            }
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid User"
            });
            return;
        }
    } else {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Token and Username required"
        });
        return;
    }
}

module.exports = validateRequest;