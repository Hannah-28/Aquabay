import express from 'express';
import Auth from '../middleware/authenticate';
import UsersController from '../controllers/UsersController';

const userRouter = express.Router();

userRouter.post(
    '/signin',
    UsersController.signIn
)

userRouter.get(
    '/',
    UsersController.getHome
)

userRouter.post(
    '/create',
    UsersController.createEntry
)

userRouter.get(
    '/pH',
    UsersController.getEntryBypH
)

export default userRouter;