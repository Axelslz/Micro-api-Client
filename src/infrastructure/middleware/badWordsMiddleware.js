const { isCommentAppropriate } = require('./naiveBayesClassifier');

const filterBadWords = (req, res, next) => {
    const { content } = req.body;
    const containsProfanity = !isCommentAppropriate(content);

    req.containsProfanity = containsProfanity; 

    next();
};

module.exports = filterBadWords;


