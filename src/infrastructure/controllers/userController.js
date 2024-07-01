const { execute: registerUser } = require('../../application/server/use-cases/userRegistration');
const { execute: loginUser } = require('../../application/server/use-cases/userLogin');


const register = async (req, res) => {
    try {
        const result = await userUseCases.userRegistration.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const token = await userUseCases.userLogin.execute(req.body);
        res.status(200).json({ token });
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

module.exports = {
    register,
    login,
    getUserProfile
};
