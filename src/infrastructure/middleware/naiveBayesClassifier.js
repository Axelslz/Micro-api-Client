const natural = require('natural');
const classifier = new natural.BayesClassifier();

const trainClassifier = () => {
    const profaneWords = [
        'Verga', 'Verguita', 'Vrga', 'Vergostian', 'Vergui', 'Idiota', 'Idiotita', 'Idiotón', 
        'Estúpido', 'Estupidito', 'Estupidote', 'Pendejo', 'Pendejito', 'Pedejote', 'Pendejisimo', 
        'Pendejaso', 'Mierda', 'Mierdita', 'Mierdilla', 'Mierdota', 'Culero', 'Culerillo', 'Culerito', 
        'Culerón', 'Imbecil', 'Sopenco', 'Sopencote', 'Totoreco', 'Totorequito', 'Mampo', 'Mampito', 
        'Mampillo', 'Puto', 'Putón', 'Putito', 'Putisimo', 'Puñal', 'Puñalón', 'Maricón', 'Mariquita', 
        'Marica', 'Zorra', 'Zorrita', 'Churpia', 'Piruja', 'Cabrón', 'Wey', 'Pinche', 'Chinga tu madre', 
        'Perra', 'Perrita', 'Perrota','Mamon', 'Puta', 'Putita', 'Mierdototota', 'Putote', 'vende chispita'
    ];

    profaneWords.forEach(word => {
        classifier.addDocument(word, 'inapropiado');
    });

    classifier.train();
};

// Entrenar el clasificador al cargar el módulo
trainClassifier();

const isCommentAppropriate = (comment) => {
    const classification = classifier.classify(comment);
    return classification !== 'inapropiado';
};

module.exports = {
    isCommentAppropriate
};
