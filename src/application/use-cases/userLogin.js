const userRepository = require('../../domain/repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Deberías almacenar esto en variables de entorno
const TOKEN_EXPIRES_IN = '1h'; // El tiempo de expiración del token

const execute = async ({ email, password }) => {
    // Buscar el usuario por email
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });

    // Devolver el token
    return { token };
};

module.exports = { execute };

