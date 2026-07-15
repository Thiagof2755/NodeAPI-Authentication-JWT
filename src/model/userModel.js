const db = require('../config/db.js');

exports.createUser = async (name, email, password) => {
    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    const [result] = await db.promise().execute(sql, [name, email, password]);
    return result;
};

exports.getUserByEmail = async (email) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const [users] = await db.promise().execute(sql, [email]);
    return users[0] || null;
};

exports.getUserById = async (id) => {
    const sql = `SELECT * FROM users WHERE id = ?`;
    const [users] = await db.promise().execute(sql, [id]);
    return users[0] || null;
};

exports.getAllUsers = async () => {
    const sql = `SELECT id, name, email FROM users`;
    const [users] = await db.promise().query(sql);
    return users;
};
