const passwordValidator = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        throw new Error('La contraseña debe tener al menos 8 caracteres.');
    }
    if (!hasUpperCase) {
        throw new Error('La contraseña debe incluir al menos una letra mayúscula.');
    }
    if (!hasLowerCase) {
        throw new Error('La contraseña debe incluir al menos una letra minúscula.');
    }
    if (!hasDigit) {
        throw new Error('La contraseña debe incluir al menos un dígito.');
    }
    if (!hasSpecialChar) {
        throw new Error('La contraseña debe incluir al menos un carácter especial.');
    }
};

module.exports = passwordValidator;
