require('dotenv').config();
const express = require('express');
const userRoutes = require('./infrastructure/routes/userRoutes');
const dbConfig = require('./infrastructure/database/dbConfig');
const { connectRabbitMQ } = require('./infrastructure/rabbitmq/rabbitmqConfig');
const { startUserSubscriber } = require('./infrastructure/rabbitmq/userSubscriber');
const { startReviewSubscriber } = require('./infrastructure/rabbitmq/reviewSubscriber');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', userRoutes);

dbConfig.initialize();

const startServer = async () => {
    try {
        await connectRabbitMQ();
        await startUserSubscriber();
        await startReviewSubscriber();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Error starting the server:', err);
        process.exit(1);
    }
};

startServer();

module.exports = app;



