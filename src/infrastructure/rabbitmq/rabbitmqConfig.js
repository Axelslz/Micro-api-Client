const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost';

let connection = null;
let channel = null;

const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();

        const exchange = 'bandct';
        const queues = ['user_queue', 'user_password_recovery', 'user_review', 'user_login']; // Incluye todas las colas necesarias
        const routingKeys = ['user.queue', 'user.password_recovery', 'user.review', 'user.login'];

        await channel.assertExchange(exchange, 'direct', { durable: true });
        for (let queue of queues) {
            await channel.assertQueue(queue, { durable: true });
            await channel.bindQueue(queue, exchange, routingKeys[queues.indexOf(queue)]);
        }

        console.log('Conectado a RabbitMQ y configurado exchange y colas');
    } catch (error) {
        console.error('Error al conectar a RabbitMQ', error);
    }
};

const getChannel = async () => {
    if (!channel) {
        await connectRabbitMQ();
    }
    return channel;
};

module.exports = {
    connectRabbitMQ,
    getChannel
};






