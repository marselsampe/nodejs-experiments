let _secretKey = 'this is token key';
let _config = {
    getSecretKey: getSecretKey
}

function getSecretKey() {
    return Buffer.from(_secretKey);
}

module.exports = _config;