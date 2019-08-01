import express from 'express';
import userRouter from './user';
import adminRouter from './admin';

const routes = express.Router();

routes.use('/', userRouter);
routes.use('/', adminRouter)

export default routes;
