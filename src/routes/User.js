const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');

router.use(express.json());


router.get('/', userController.getAllUsers);// Rota de exemplo para obter todos os usuários (substitua por suas próprias rotas)
router.post('/auth/register', userController.registerUser);// Rota para registrar um novo usuário
router.post('/auth/login', userController.loginUser);// Rota para fazer login de um usuário

module.exports = router;
