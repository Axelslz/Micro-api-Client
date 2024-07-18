const express = require('express');
const userRoutes = require('./infrastructure/routes/userRoutes');
const dbConfig = require('./infrastructure/database/dbConfig');
const { connectRabbitMQ } = require('./infrastructure/rabbitmq/rabbitmqConfig');
const { startUserSubscriber } = require('./infrastructure/rabbitmq/userSubscriber');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoutes);

dbConfig.initialize();  // Asumiendo que tienes una función para configurar la base de datos

const startServer = async () => {
    await connectRabbitMQ();
    await startUserSubscriber();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();

