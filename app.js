import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();
import blogRoutes from './routes/blogs.route.js';
import userRoutes from './routes/users.route.js';
import './config/database.js';
import { authMiddleware } from './middleware.js';

const app = express();

app.use(authMiddleware);
app.use(passport.initialize());
app.use(
    helmet(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    cors({
        origin: 'http://localhost:8000',
    })
);
app.use('/blogs', blogRoutes);
app.use('/users', userRoutes);

export default app;