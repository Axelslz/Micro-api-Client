const express = require('express');
const userRoutes = require('./infrastructure/routes/userRoutes');
const dbConfig = require('./database/dbConfig');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoutes);

dbConfig.initialize();  // Asumiendo que tienes una función para configurar la base de datos

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
