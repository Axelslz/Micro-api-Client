const { getChannel } = require('./rabbitmqConfig');

const publishUserCreated = async (user) => {
    const channel = getChannel();
    const queue = 'user_created';
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(user)));
    console.log(`Mensaje enviado a la cola ${queue}:`, user);
};

module.exports = {
    publishUserCreated
};
