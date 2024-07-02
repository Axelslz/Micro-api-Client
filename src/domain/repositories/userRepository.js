const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../../database/dbConfig');  // Importando el pool desde dbConfig

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Deberías almacenar esto en variables de entorno
const TOKEN_EXPIRES_IN = '1h';

const create = async (userData) => {
    const { fullName, email, password, phoneNumber, location } = userData;

    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO users (fullName, email, password, phoneNumber, location) VALUES (?, ?, ?, ?, ?)', 
        [fullName, email, password, phoneNumber, location], 
        (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve({ id: results.insertId, ...userData, password: undefined });
        });
    });
};

const authenticate = async (email, password) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
            if (error) {
                return reject(new Error('Error accessing the database'));
            }
            if (results.length === 0) {
                return reject(new Error('Invalid credentials'));
            }
            const user = results[0];
            if (password !== user.password) {
                return reject(new Error('Invalid credentials'));
            }
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
            resolve({ token });
        });
    });
};


const findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
            console.log(results);  // Ver qué está retornando la base de datos
            if (error) {
                console.error("Error fetching user by email:", error);
                reject(error);
            } else {
                resolve(results.length > 0 ? results[0] : null);
            }
        });
    });
};


module.exports = {
    create,
    authenticate,
    findByEmail
};
