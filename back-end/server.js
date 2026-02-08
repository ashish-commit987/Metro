import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from 'express';
import chalk from 'chalk';
import cors from 'cors';

import { indexRoute } from './api/v1/routes/index.js';
import { Error404 } from './utils/middlewares/404.js';
import { CreateConnection } from './utils/db/connection.js';
import { startCleanupScheduler } from './cleanup-scheduler.js';

const app = express();

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.json());
app.use('/api/v1', indexRoute);
app.use(Error404);

CreateConnection()
    .then(() => {
        const PORT = process.env.PORT || 7777;

        app.listen(PORT, '0.0.0.0', () => {
            console.log(
                chalk.greenBright.bold(`Server Up and Running on port ${PORT}`)
            );
            startCleanupScheduler();
        });
    })
    .catch(err => {
        console.log(chalk.redBright.bold('DB crash...'), err);
    });
