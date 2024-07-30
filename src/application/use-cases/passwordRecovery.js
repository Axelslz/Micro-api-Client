const userRepository = require('../../domain/repositories/userRepository');
const { generateRecoveryToken, sendRecoveryEmail } = require('../../infrastructure/utils/recoveryUtils');

const requestPasswordRecovery = async (email) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const recoveryToken = generateRecoveryToken();
    const tokenExpirationTime = Date.now() + 5 * 60 * 1000; // Token válido por 5 minutos

    await userRepository.storeRecoveryToken(user.id, recoveryToken, tokenExpirationTime);
    await sendRecoveryEmail(email, recoveryToken);

    return { recoveryToken };
};

const resetPassword = async (email, token, newPassword) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const storedTokenData = await userRepository.getRecoveryToken(user.id);
    if (!storedTokenData || storedTokenData.token !== token || storedTokenData.expirationTime < Date.now()) {
        throw new Error('Invalid or expired token');
    }

    await userRepository.updatePassword(user.id, newPassword);
    await userRepository.removeRecoveryToken(user.id);

    return { message: 'Password reset successfully' };
};

module.exports = {
    requestPasswordRecovery,
    resetPassword
};
