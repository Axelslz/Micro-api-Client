const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../../database/dbConfig');  // Importando el pool desde dbConfig

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Deberías almacenar esto en variables de entorno
const TOKEN_EXPIRES_IN = '1h';

const create = async (userData) => {
    const { fullName, email, password, phoneNumber, location } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO users (fullName, email, password, phoneNumber, location) VALUES (?, ?, ?, ?, ?)', [fullName, email, hashedPassword, phoneNumber, location], (error, results) => {
            if (error) {
                return reject(error);
            }
            // Devolver el usuario con la id asignada por MySQL
            resolve({ id: results.insertId, ...userData, password: undefined });  // Ocultar la contraseña al devolver el usuario
        });
    });
};

const authenticate = async (email, password) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                return reject(new Error('Error accessing the database'));
            }
            if (results.length === 0) {
                return reject(new Error('Invalid credentials'));  // No se encontró el usuario
            }
            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return reject(new Error('Invalid credentials'));  // La contraseña no coincide
            }
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
            resolve({ token });
        });
    });
};


const findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
            if (error) {
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
