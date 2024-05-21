const express = require('express');
const app = express();
const userRoutes = require('./src/routes/User'); // Importe as rotas do usuário

// Configuração da conexão com o banco de dados
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Use as rotas de cada entidade
app.use('/user', userRoutes);

// Configuração da aplicação
app.use(express.json());


// Define a rota inicial
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World!'
    });
});

// Inicie o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
