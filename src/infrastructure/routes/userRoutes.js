const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/register', userController.register); // Ruta para registro de usuarios, no necesita autenticación
router.post('/login', userController.login);    // Ruta para el login de usuarios, no necesita autenticación
router.get('/profile', verifyToken, userController.getUserProfile);  // Ruta protegida para obtener el perfil del usuario, requiere autenticación
router.put('/profile', verifyToken, userController.updateUserProfile); // actualizar el perfil del usuario

module.exports = router;


