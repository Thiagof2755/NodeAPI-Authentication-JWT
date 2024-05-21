const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const secretKey = process.env.SECRET_KEY;

require('dotenv').config();

exports.registerUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    
    // Verifica se todos os campos foram fornecidos
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Verifica se as senhas são iguais
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'As senhas precisam ser iguais' });
    }

    try {
        // Gera o hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o usuário no banco de dados
        await userModel.createUser(name, email, hashedPassword);

        res.status(200).json({ message: 'Usuário registrado com sucesso' });
    } catch (err) {
        console.error('Erro ao registrar o usuário:', err);
        res.status(500).json({ error: 'Erro ao registrar o usuário' });
    }
};





exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Verifica se o usuário existe no banco de dados
        userModel.getUserByEmail(email, (err, user) => {
            if (err) {
                console.error('Erro ao obter usuário:', err);
                return res.status(500).json({ error: 'Erro ao fazer login' });
            }
            if (!user || user.email !== email) {
                return res.status(401).json({ error: 'Email ou senha inválidos' });
            }
            // Verifica se a senha está correta
            bcrypt.compare(password, user.password, (err, isPasswordValid) => {
                if (err) {
                    console.error('Erro ao comparar senhas:', err);
                    return res.status(500).json({ error: 'Erro ao fazer login' });
                }
                if (!isPasswordValid) { 
                    return res.status(401).json({ error: 'Email ou senha inválidos' });
                }

                // Cria o token de autenticação
                const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
                res.status(200).json({ token, name: user.name });
            });
        });
    } catch (err) {
        console.error('Erro ao fazer login:', err);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        // Obtém todos os usuários do banco de dados
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error('Erro ao obter todos os usuários:', err);
        res.status(500).json({ error: 'Erro ao obter todos os usuários' });
    }
};
