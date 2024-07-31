const { publishReview } = require('../../infrastructure/rabbitmq/reviewPublisher');

const addReview = async (req, res) => {
    try {
        const { userId, content } = req.body;
        const containsProfanity = req.containsProfanity;

        const reviewData = { userId, content, containsProfanity };
        await publishReview(reviewData);

        if (containsProfanity) {
            res.status(400).json({ message: 'Comentario eliminado por lenguaje inapropiado o puede ser violento para el público.' });
        } else {
            res.status(201).json({ message: 'Comentario Publicado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    addReview
};















