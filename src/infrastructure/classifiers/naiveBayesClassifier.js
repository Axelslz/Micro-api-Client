const natural = require('natural');
const classifier = new natural.BayesClassifier();

const profaneWords = [
    'verga', 'verguita', 'vrga', 'vergostian', 'vergui', 'idiota', 'idiotita', 'idiotón', 
    'estúpido', 'estupidito', 'estupidote', 'pendejo', 'pendejito', 'pedejote', 'pendejisimo', 
    'pendejaso', 'mierda', 'mierdita', 'mierdilla', 'mierdota', 'culero', 'culerillo', 'culerito', 
    'culerón', 'imbecil', 'sopenco', 'sopencote', 'totoreco', 'totorequito', 'mampo', 'mampito', 
    'mampillo', 'puto', 'putón', 'putito', 'putisimo', 'puñal', 'puñalón', 'maricón', 'mariquita', 
    'marica', 'zorra', 'zorrita', 'churpia', 'piruja', 'cabrón', 'wey', 'pinche', 'chinga tu madre', 
    'perra', 'perrita', 'perrota', 'mamon', 'puta', 'putita', 'mierdototota', 'putote', 'vende chispita'
];

const trainClassifier = () => {
    profaneWords.forEach(word => {
        classifier.addDocument(word, 'inapropiado');
    });

    classifier.train();
};

// Entrenar el clasificador al cargar el módulo
trainClassifier();

const isCommentAppropriate = (comment) => {
    const tokens = comment.split(/\s+/); // Dividir el comentario en palabras
    for (let token of tokens) {
        if (profaneWords.includes(token.toLowerCase())) {
            console.log(`Palabra inapropiada detectada: "${token}"`);
            return false;
        }
    }
    console.log(`Comentario apropiado: "${comment}"`);
    return true;
};

module.exports = {
    isCommentAppropriate
};


