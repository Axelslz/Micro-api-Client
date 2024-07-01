const userRepository = require('../../../domain/repositories/userRepository');
const bcrypt = require('bcryptjs');

const execute = async (userData) => {
    // Verificar que el email no esté ya en uso
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
        throw new Error('Email already in use');
    }

    // Encriptar la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    // Crear el usuario en la base de datos
    return userRepository.create(userData);
};

module.exports = { execute };
