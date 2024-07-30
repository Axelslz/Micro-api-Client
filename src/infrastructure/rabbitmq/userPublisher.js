const { getChannel } = require('./rabbitmqConfig');

const publishUserCreated = async (user) => {
    const channel = getChannel();
    const exchange = 'bandct';
    const routingKey = 'user.created';
    const message = JSON.stringify(user);

    channel.publish(exchange, routingKey, Buffer.from(message), { persistent: true });
    console.log(`Mensaje enviado al exchange ${exchange} con la clave de enrutamiento ${routingKey}:`, user);
};

const publishUserLogin = async (credentials) => {
    const channel = getChannel();
    const exchange = 'bandct';
    const routingKey = 'user.login';
    const message = JSON.stringify(credentials);

    channel.publish(exchange, routingKey, Buffer.from(message), { persistent: true });
    console.log(`Mensaje de login enviado al exchange ${exchange} con la clave de enrutamiento ${routingKey}:`, credentials);
};

const publishPasswordRecovery = async (data) => {
    const channel = getChannel();
    const exchange = 'bandct';
    const routingKey = 'user.password_recovery';
    const message = JSON.stringify(data);

    channel.publish(exchange, routingKey, Buffer.from(message), { persistent: true });
    console.log(`Mensaje de recuperación de contraseña enviado al exchange ${exchange} con la clave de enrutamiento ${routingKey}:`, data);
};

const publishUserUpdated = async (user) => {
    const channel = getChannel();
    const exchange = 'bandct';
    const queue = 'user_updated';
    await channel.assertQueue(exchange, queue, { durable: true });
    channel.sendToQueue(exchange, queue, Buffer.from(JSON.stringify(user)));
    console.log(`Mensaje enviado a la cola ${queue}:`, user);
};

module.exports = {
    publishUserCreated,
    publishUserLogin,
    publishPasswordRecovery,
    publishUserUpdated
};
