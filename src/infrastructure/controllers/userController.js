const userRegistration = require('../../application/use-cases/userRegistration');
const { publishUserLogin } = require('../../infrastructure/rabbitmq/userPublisher');
const userRepository = require('../../domain/repositories/userRepository');
const { requestPasswordRecovery, resetPassword } = require('../../application/use-cases/passwordRecovery');
const { getChannel } = require('../../infrastructure/rabbitmq/rabbitmqConfig');
const updateUser = require('../../application/use-cases/updateUser');
 
const register = async (req, res) => {
    try {
        const user = await userRegistration.execute(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        await publishUserLogin(req.body);

        setTimeout(() => {
            const token = getTemporaryLoginResponse(req.body.email);
            if (token) {
                res.status(200).json({ message: 'Welcome to BandConnect', token });
            } else {
                res.status(401).json({ message: 'Login failed' });
            }
        }, 1000);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await userRepository.findById(req.user.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const recoverPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const tokenData = await requestPasswordRecovery(email);

        res.status(200).json({ message: 'Recovery token generated', token: tokenData.recoveryToken });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const resetUserPassword = async (req, res) => {
    try {
        const { email, token, newPassword } = req.body;
        const response = await resetPassword(email, token, newPassword);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { userId, ...userData } = req.body;
        console.log(`Received update request for userId: ${userId} with data: ${JSON.stringify(userData)}`); // Log para verificar la solicitud

        // Verificar que userId no es undefined o null
        if (!userId) {
            return res.status(400).json({ message: 'UserId is required' });
        }

        const updatedUser = await updateUser.execute(userId, userData);
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(`Error updating user: ${error.message}`); // Log para verificar errores
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    register,
    login,
    getUserProfile,
    recoverPassword,
    resetUserPassword,
    updateUserProfile
};
