const db = require('../config/db.js');

exports.createUser = (name, email, password, callback) => {
    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};

exports.getUserByEmail = (email, callback) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], (err, users) => {
        if (err) {
            return callback(err);
        }
        if (users.length === 0) {
            return callback(null, null); // Retorna null se nenhum usuário for encontrado
        }
        callback(null, users[0]); // Retorna o primeiro usuário encontrado
    });
};


exports.getUserById = (id, callback) => {
    const sql = `SELECT * FROM users WHERE id = ?`;
    db.query(sql, [id], (err, user) => {
        if (err) {
            return callback(err);
        }
        callback(null, user[0]);
    });
};

exports.getAllUsers = (callback) => {
    const sql = `SELECT * FROM users`;
    db.query(sql, (err, users) => {
        if (err) {
            return callback(err);
        }
        callback(null, users);
    });
};
