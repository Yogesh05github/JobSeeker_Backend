import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import userRouter from './routes/userRouter.js'
import jobRouter from './routes/jobRouter.js';
import applicationRouter from './routes/applicationRouter.js'

import {dbConnection} from './database/dbConnection.js'
import {errorMiddleware} from './middleware/error.js'

const app = express();
dotenv.config()

app.use(cors({
    origin: ['https://job-seeker-frontend-beta.vercel.app' , 'http://localhost:5173' ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload ({
     useTempFiles: true,
     tempFileDir :"/tmp/"
})) 


dbConnection();

app.get('/', (req, res) => {
  res.send('Welcome to the Job Seeker API!');
});
app.use('/api/v1/user' , userRouter);
app.use('/api/v1/application' , applicationRouter);
app.use("/api/v1/job" , jobRouter);
app.use(errorMiddleware)


 


export default app;

