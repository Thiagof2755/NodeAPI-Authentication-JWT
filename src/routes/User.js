const express = require('express');
const userController = require('../controller/userController.js');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/auth/register', userController.registerUser);
router.post('/auth/login', userController.loginUser);

module.exports = router;
