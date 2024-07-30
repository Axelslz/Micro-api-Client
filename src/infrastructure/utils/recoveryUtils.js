const crypto = require('crypto');

const generateRecoveryToken = () => {
    return Math.floor(10000 + Math.random() * 90000).toString(); // 5-digit token
};

const sendRecoveryEmail = async (email, recoveryToken) => {
    // En esta versión, no enviamos el correo electrónico.
    console.log(`Generated recovery token for ${email}: ${recoveryToken}`);
};

module.exports = {
    generateRecoveryToken,
    sendRecoveryEmail
};


