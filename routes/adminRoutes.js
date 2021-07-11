const express = require('express');
const router = express.Router();

const session = require('express-session');

const authService = require('../services/auth');


router.use(session({secret: "notagoodsecret"}))

router.post('/register', authService.register);
router.get('/show', authService.viewAdmin);
router.post('/login', authService.login);

module.exports = router;