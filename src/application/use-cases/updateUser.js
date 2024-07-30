const userRepository = require('../../domain/repositories/userRepository');
const { publishUserUpdated } = require('../../infrastructure/rabbitmq/userPublisher');

const execute = async (userId, userData) => {
    console.log(`Updating user with id: ${userId}`); // Log para verificar el id
    const existingUser = await userRepository.findById(userId);
    if (!existingUser) {
        throw new Error('User not found');
    }

    // Asegurarse de que solo se actualicen los campos permitidos
    const allowedUpdates = ['fullName', 'email', 'phoneNumber', 'location'];
    const updates = {};
    allowedUpdates.forEach(field => {
        if (userData[field] !== undefined) {
            updates[field] = userData[field];
        }
    });

    const updatedUser = await userRepository.update(userId, updates);

    // Publicar el mensaje de actualización en RabbitMQ
    await publishUserUpdated(updatedUser);

    return updatedUser;
};

module.exports = { execute };

