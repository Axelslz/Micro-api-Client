const { getChannel } = require('../../infrastructure/rabbitmq/rabbitmqConfig');
const { createReview } = require('../../domain/repositories/reviewRepository');

const addReview = async (req, res) => {
    try {
        const { userId, content } = req.body;
        const containsProfanity = req.containsProfanity; // Obtener la información de la profanidad desde la solicitud
        const channel = await getChannel();
        const queueReview = 'user_review';

        const message = JSON.stringify({ userId, content, containsProfanity });
        await channel.sendToQueue(queueReview, Buffer.from(message), { persistent: true });

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







