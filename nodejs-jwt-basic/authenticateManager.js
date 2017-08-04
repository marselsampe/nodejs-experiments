let _jwt = require('jwt-simple');
let _jwt_config = require('./config/jwt-config');

let _authenticateManager = {
    validateLogin: validateLogin,
    validateUser: validateUser,
    generateToken: generateToken,
    validateToken: validateToken
}

function validateLogin(username, password) {
    if ((username == 'admin1' && password == 'admin1') || (username == 'admin2' && password == 'admin2'))
        return true;
    return false;
}

function validateUser(username) {
    if (username == 'admin1' || username == 'admin2')
        return true;
    return false;
}

function generateToken(username) {
    let date = new Date();
    let expiredDate = date.setDate(date.getDate() + 1);
    let payload = {
        username: username,
        expires: expiredDate
    }
    let secretKey = _jwt_config.getSecretKey();
    let token = _jwt.encode(payload, secretKey);

    return {
        token: token,
        expires: expiredDate,
        username: username
    }
}

function validateToken(token, username) {
    try {
        let secretKey = _jwt_config.getSecretKey();
        let decodedToken = _jwt.decode(token, secretKey);
        if (decodedToken.expires > Date.now() && decodedToken.username == username)
            return true;
        return false;
    } catch (err) {
        return false;
    }
}

module.exports = _authenticateManager;