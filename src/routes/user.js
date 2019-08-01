import express from 'express';
import UsersController from '../controllers/UsersController';

const userRouter = express.Router();

userRouter.post(
    '/signin',
    UsersController.singIn
)

userRouter.get(
    '/',
    UsersController.getHome
)

export default userRouter;