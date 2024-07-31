const { pool } = require('../../infrastructure/database/dbConfig');

const createReview = ({ userId, content }) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO reviews (userId, content) VALUES (?, ?)';
        pool.query(query, [userId, content], (error, results) => {
            if (error) {
                console.error('Error al crear la reseña:', error);
                return reject(error);
            }
            resolve(results.insertId);
        });
    });
};

module.exports = {
    createReview
};



