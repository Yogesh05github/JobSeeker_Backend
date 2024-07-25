import express from 'express';

import userRouter from './userRouter.js'
import jobRouter from './jobRouter.js';
import applicationRouter from './applicationRouter.js'

const router = express.Router();


router.get('/', (req, res) => {
    res.send('Welcome to the Job Seeker API!');
  });
  
  router.use('/api/v1/user' , userRouter);
  router.use('/api/v1/application' , applicationRouter);
  router.use("/api/v1/job" , jobRouter);

export default router;