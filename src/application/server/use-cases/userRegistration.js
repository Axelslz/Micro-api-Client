const userRepository = require('../../../domain/repositories/userRepository');

const execute = async (userData) => {
    // Validación y lógica de negocio aquí
    return userRepository.create(userData);
};

module.exports = { execute };