const passwordPolicy = (req, res, next) => {
    const { password } = req.body;

    const passwordRequirements = [
        { regex: /.{8,}/, message: 'La contraseña debe tener al menos 8 caracteres.' },
        { regex: /[A-Z]/, message: 'La contraseña debe incluir al menos una letra mayúscula.' },
        { regex: /[a-z]/, message: 'La contraseña debe incluir al menos una letra minúscula.' },
        { regex: /\d/, message: 'La contraseña debe incluir al menos un dígito.' },
        { regex: /[\W_]/, message: 'La contraseña debe incluir al menos un carácter especial.' }
    ];

    for (let requirement of passwordRequirements) {
        if (!requirement.regex.test(password)) {
            return res.status(400).json({ message: requirement.message });
        }
    }

    next();
};

module.exports = passwordPolicy;
