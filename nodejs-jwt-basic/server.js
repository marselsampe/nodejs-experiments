let _express = require('express');
let _bodyParser = require('body-parser');

let _app = _express();

_app.use(_bodyParser.json());

// all premium api url must be validate
_app.all('/premium/*', [require('./validateRequest')]);

_app.use('/', require('./router'));

// if no route match, throw 404
_app.use(function (req, res) {
    res.status(404);
    res.json({
        "status": 404,
        "message": "Not found"
    });
    return;
});

_app.set('port', 3000);
let server = _app.listen(_app.get('port'), function () {
    console.log('server start on port ' + server.address().port);
});