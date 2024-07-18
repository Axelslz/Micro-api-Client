const { getChannel } = require('./rabbitmqConfig');

const startUserSubscriber = async () => {
    const channel = getChannel();
    const queue = 'user_created';
    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, (msg) => {
        if (msg !== null) {
            const user = JSON.parse(msg.content.toString());
            console.log(`Mensaje recibido de la cola ${queue}:`, user);
            // Procesar el mensaje aquí
            channel.ack(msg);
        }
    });
};

module.exports = {
    startUserSubscriber
};
