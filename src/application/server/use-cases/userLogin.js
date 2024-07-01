const userRepository = require('../../../domain/repositories/userRepository');

const execute = async ({ email, password }) => {
    // Validación y lógica de negocio aquí
    return userRepository.authenticate(email, password);
};

module.exports = { execute };