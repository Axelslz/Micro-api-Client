const { getChannel } = require('./rabbitmqConfig');

const publishReview = async (reviewData) => {
    try {
        const channel = await getChannel();
        const queueReview = 'user_review';
        
        const message = JSON.stringify(reviewData);
        await channel.assertQueue(queueReview, { durable: true });
        await channel.sendToQueue(queueReview, Buffer.from(message), { persistent: true });
        console.log(`Mensaje enviado a la cola ${queueReview}:`, message);
    } catch (error) {
        console.error(`Error al publicar la reseña en RabbitMQ: ${error.message}`);
        throw error;
    }
};

module.exports = {
    publishReview
};



