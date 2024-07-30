const userRepository = require('../../domain/repositories/userRepository');
const bcrypt = require('bcryptjs');
const passwordValidator = require('../../infrastructure/utils/passwordValidator');
const { publishUserCreated } = require('../../infrastructure/rabbitmq/userPublisher');

const execute = async (userData) => {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
        throw new Error('Email already in use');
    }

    passwordValidator(userData.password);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const user = await userRepository.create(userData);

    await publishUserCreated(user);

    return user;
};

module.exports = { execute };



