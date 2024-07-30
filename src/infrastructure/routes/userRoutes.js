const express = require('express');
const userController = require('../controllers/userController');
const reviewController = require('../controllers/reviewController'); 
const verifyToken = require('../middleware/authMiddleware');
const filterBadWords = require('../middleware/badWordsMiddleware'); 
const passwordPolicyMiddleware = require('../middleware/passwordPolicyMiddleware');

const router = express.Router();

router.post('/register', passwordPolicyMiddleware, userController.register);
router.post('/login', userController.login);
router.post('/recover-password', userController.recoverPassword);
router.post('/reset-password', passwordPolicyMiddleware, userController.resetUserPassword);
router.get('/profile', verifyToken, userController.getUserProfile);
router.post('/reviews', filterBadWords, reviewController.addReview);
router.put('/update', userController.updateUserProfile);

module.exports = router;




