const { pool } = require('../../infrastructure/database/dbConfig');
const Review = require('../entities/review');

const createReview = async (reviewData) => {
    const { userId, content } = reviewData;
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO reviews (userId, content, createdAt) VALUES (?, ?, NOW())',
            [userId, content],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                const createdReview = new Review({ id: results.insertId, userId, content, createdAt: new Date() });
                resolve(createdReview);
            }
        );
    });
};

const getReviewsByUser = async (userId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT * FROM reviews WHERE userId = ?',
            [userId],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                const reviews = results.map(row => new Review(row));
                resolve(reviews);
            }
        );
    });
};

module.exports = {
    createReview,
    getReviewsByUser
};

