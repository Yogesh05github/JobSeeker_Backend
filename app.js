import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import userRouter from './routes/userRouter.js';
import jobRouter from './routes/jobRouter.js';
import applicationRouter from './routes/applicationRouter.js';

import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './middleware/error.js';

const app = express();
dotenv.config(); // Load environment variables

// CORS configuration
const corsOptions = {
    origin: 'https://job-seeker-frontend-beta.vercel.app', // Frontend domain
    credentials: true, // Allow credentials (cookies)
    optionsSuccessStatus: 200 // For legacy browser support
};

// Apply CORS middleware with the specified options
app.use(cors(corsOptions));

// Other middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload configuration
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: process.env.TEMP_FILE_DIR || "/tmp/"
}));

// Connect to the database and handle errors
dbConnection().catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit the process if DB connection fails
});

// Basic route to test server
app.get('/', (req, res) => {
    res.send('Welcome to the Job Seeker API!');
});

// User, Job, and Application Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/application', applicationRouter);
app.use('/api/v1/job', jobRouter);

// Error handling middleware
app.use(errorMiddleware);

// Handle preflight requests (OPTIONS) for all routes
app.options('*', cors(corsOptions));

export default app;
