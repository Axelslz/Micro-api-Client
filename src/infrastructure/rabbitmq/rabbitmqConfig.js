const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost';

let channel = null;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('Conectado a RabbitMQ');
    } catch (error) {
        console.error('Error al conectar a RabbitMQ', error);
    }
};

const getChannel = () => {
    if (!channel) {
        throw new Error('Canal de RabbitMQ no está inicializado');
    }
    return channel;
};

module.exports = {
    connectRabbitMQ,
    getChannel
};
