var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var items = require('./items.js');
var user = require('./users.js');

var authMiddlewarePath = '/api/v1/';

// Routes that can be accessed by any one
router.post('/login', auth.login);

// Routes that can be accessed only by autheticated users
router.get(authMiddlewarePath + 'items', items.getAll);
router.get(authMiddlewarePath + 'item/:id', items.getDetail);
router.post(authMiddlewarePath + 'item/', items.create);
router.put(authMiddlewarePath + 'item/:id', items.update);
router.delete(authMiddlewarePath + 'item/:id', items.delete);

// Routes that can be accessed only by authenticated & authorized users
router.get(authMiddlewarePath + 'admin/users', user.getAll);
router.get(authMiddlewarePath + 'admin/user/:id', user.getDetail);
router.post(authMiddlewarePath + 'admin/user/', user.create);
router.put(authMiddlewarePath + 'admin/user/:id', user.update);
router.delete(authMiddlewarePath + 'admin/user/:id', user.delete);

module.exports = router;