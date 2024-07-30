const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../../infrastructure/database/dbConfig');  // Importando el pool desde dbConfig

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
            if (!bcrypt.compareSync(password, user.password)) {
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

const findById = (id) => {
    return new Promise((resolve, reject) => {
        console.log(`Searching for user with id: ${id}`); // Log para verificar el id
        pool.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
            if (error) {
                console.error("Error fetching user by id:", error);
                reject(error);
            } else {
                console.log(`Database results: ${JSON.stringify(results)}`); // Log para verificar resultados
                resolve(results.length > 0 ? results[0] : null);
            }
        });
    });
};



const updatePassword = (id, newPassword) => {
    return new Promise((resolve, reject) => {
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id], (error, results) => {
            if (error) {
                console.error("Error updating password:", error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const storeRecoveryToken = (userId, token, expirationTime) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users SET recoveryToken = ?, tokenExpirationTime = ? WHERE id = ?', [token, expirationTime, userId], (error, results) => {
            if (error) {
                console.error("Error storing recovery token:", error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const getRecoveryToken = (userId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT recoveryToken as token, tokenExpirationTime as expirationTime FROM users WHERE id = ?', [userId], (error, results) => {
            if (error) {
                console.error("Error fetching recovery token:", error);
                reject(error);
            } else {
                resolve(results.length > 0 ? results[0] : null);
            }
        });
    });
};

const removeRecoveryToken = (userId) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users SET recoveryToken = NULL, tokenExpirationTime = NULL WHERE id = ?', [userId], (error, results) => {
            if (error) {
                console.error("Error removing recovery token:", error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

const update = (id, updates) => {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    
    return new Promise((resolve, reject) => {
        console.log(`Updating user with id: ${id} and fields: ${fields}`); // Log para verificar la actualización
        pool.query(`UPDATE users SET ${fields} WHERE id = ?`, [...values, id], (error, results) => {
            if (error) {
                console.error("Error updating user:", error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};


module.exports = {
    create,
    authenticate,
    findByEmail,
    findById,
    updatePassword,
    storeRecoveryToken,
    getRecoveryToken,
    removeRecoveryToken,
    update
};




