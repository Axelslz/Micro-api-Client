const { getChannel } = require('./rabbitmqConfig');
const { createReview } = require('../../domain/repositories/reviewRepository');

const startReviewSubscriber = async () => {
    const channel = await getChannel();
    const queueReview = 'user_review';

    await channel.consume(queueReview, async (msg) => {
        if (msg !== null) {
            const { userId, content, containsProfanity } = JSON.parse(msg.content.toString());
            console.log(`Mensaje de reseña recibido de la cola ${queueReview}:`, userId, content, containsProfanity);

            if (!containsProfanity) {
                try {
                    await createReview({ userId, content });
                    console.log(`Reseña creada para el usuario: ${userId}`);
                } catch (error) {
                    console.error(`Error al procesar el mensaje de reseña: ${error.message}`);
                }
            } else {
                console.log(`Reseña inapropiada detectada para el usuario: ${userId}, no se guardará en la base de datos.`);
            }

            channel.ack(msg);
        }
    }, { noAck: false });
};

module.exports = {
    startReviewSubscriber
};

