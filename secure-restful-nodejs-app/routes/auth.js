var jwt = require('jwt-simple');

var auth = {
    login: function (req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username == '' || password == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        // Fire a query to your DB and check if the credentials are valid
        var dbUserObj = auth.validate(username, password);

        if (!dbUserObj) { // If authentication fails, we send a 401 back
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        if (dbUserObj) {
            // If authentication is success, we will generate a token
            // and dispatch it to the client
            res.json(generateToken(dbUserObj));
        }
    },
    validate: function (username, password) {
        // dummy DB response for simplicity
        var dbUserObj = {
            name: 'admin',
            role: 'admin',
            username: 'admin@gmail.com'
        };

        return dbUserObj;
    },
    validateUser: function (username) {
        // dummy DB response for simplicity
        var dbUserObj = {
            name: 'admin',
            role: 'user',
            username: 'admin@gmail.com'
        };

        return dbUserObj;
    },
}

function generateToken(user) {
    var expiredDate = countExpiredDate(7); // 7 days
    var token = jwt.encode({
        expiredDate: expiredDate
    }, require('../config/secret')());

    return {
        token: token,
        expires: expiredDate,
        user: user
    };
}

function countExpiredDate(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;