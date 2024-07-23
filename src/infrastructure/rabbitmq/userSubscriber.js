const { getChannel } = require('./rabbitmqConfig');

const startUserSubscriber = async () => {
    const channel = await getChannel();
    const queueUser = 'user_queue'; // Ajusta esto al nombre real de tu cola de usuarios

    await channel.consume(queueUser, async (msg) => {
        if (msg !== null) {
            // Procesa el mensaje de usuario aquí
            console.log(`Mensaje recibido de la cola ${queueUser}:`, msg.content.toString());
            channel.ack(msg);
        }
    });
};

module.exports = {
    startUserSubscriber
};





