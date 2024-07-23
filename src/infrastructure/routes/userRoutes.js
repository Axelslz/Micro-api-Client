const express = require('express');
const userController = require('../controllers/userController');
const reviewController = require('../controllers/reviewController'); 
const verifyToken = require('../middleware/authMiddleware');
const filterBadWords = require('../middleware/badWordsMiddleware'); 

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/recover-password', userController.recoverPassword);
router.post('/reset-password', userController.resetUserPassword);
router.get('/profile', verifyToken, userController.getUserProfile);


router.post('/reviews', filterBadWords, reviewController.addReview);

module.exports = router;




