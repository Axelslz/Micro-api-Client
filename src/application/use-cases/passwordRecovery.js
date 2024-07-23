const userRepository = require('../../domain/repositories/userRepository');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const generateRecoveryToken = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Genera un token de 6 dígitos
};

const requestPasswordRecovery = async (email) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const recoveryToken = generateRecoveryToken();
    const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutos a partir de ahora
    await userRepository.storeRecoveryToken(user.id, recoveryToken, expirationTime);

    return { recoveryToken }; // Devolver el token generado
};

const verifyRecoveryToken = async (email, token) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const storedTokenData = await userRepository.getRecoveryToken(user.id);
    if (!storedTokenData || storedTokenData.token !== token || storedTokenData.expirationTime < Date.now()) {
        throw new Error('Invalid or expired recovery token');
    }

    // Eliminar el token después de la verificación
    await userRepository.removeRecoveryToken(user.id);

    return user;
};

const resetPassword = async (email, token, newPassword) => {
    const user = await verifyRecoveryToken(email, token);
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.updatePassword(user.id, hashedPassword);

    return { message: 'Password has been reset successfully' };
};

module.exports = { requestPasswordRecovery, resetPassword };



