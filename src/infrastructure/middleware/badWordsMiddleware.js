const { isCommentAppropriate } = require('../classifiers/naiveBayesClassifier');

const filterBadWords = (req, res, next) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }

    req.containsProfanity = !isCommentAppropriate(content);
    console.log(`Comentario: "${content}" - Contiene profanidad: ${req.containsProfanity}`);
    next();
};

module.exports = filterBadWords;


