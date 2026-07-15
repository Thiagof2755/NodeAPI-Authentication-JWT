require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const secretKey = process.env.SECRET_KEY;

exports.registerUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'As senhas precisam ser iguais' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.createUser(name, email, hashedPassword);

        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (err) {
        console.error('Erro ao registrar o usuário:', err);
        res.status(500).json({ error: 'Erro ao registrar o usuário' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    if (!secretKey) {
        return res.status(500).json({ error: 'SECRET_KEY não configurada no servidor' });
    }

    try {
        const user = await userModel.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token, name: user.name });
    } catch (err) {
        console.error('Erro ao fazer login:', err);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error('Erro ao obter todos os usuários:', err);
        res.status(500).json({ error: 'Erro ao obter todos os usuários' });
    }
};
