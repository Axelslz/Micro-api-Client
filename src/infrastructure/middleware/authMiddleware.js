const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extraer el token del encabezado de autorización
    if (!token) {
        return res.status(403).json({ message: 'A token is required for authentication' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Agregar la información decodificada del token al objeto de solicitud
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    next();
};

module.exports = verifyToken;
