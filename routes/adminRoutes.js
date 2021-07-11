const express = require('express');
const router = express.Router();

const session = require('express-session');

const authService = require('../services/auth');


router.use(session({secret: "notagoodsecret"}))

router.post('/register', authService.register);
router.get('/show', authService.viewAdmin);
router.post('/login', authService.login);
// router.get('/search?', crudService.getUserByAccountOrIdentity);

// router.post('/new', crudService.addUser);
// router.patch('/edit/:identityNumber', crudService.editUser);
// router.delete('/delete/:identityNumber', crudService.deleteUser);

module.exports = router;