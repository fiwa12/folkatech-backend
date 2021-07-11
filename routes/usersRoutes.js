
const express = require('express');
const router = express.Router();

const crudService = require('../services/crudService');


router.get('/', crudService.getUsers);
router.get('/search?', crudService.getUserByAccountOrIdentity);

router.post('/new', crudService.addUser);
router.patch('/edit/:identityNumber', crudService.editUser);
router.delete('/delete/:identityNumber', crudService.deleteUser);

module.exports = router;