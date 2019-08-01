import express from 'express';
import IndexController from '../controllers/IndexController';

const indexRouter = express.Router();

indexRouter.get(
    '/',
    IndexController.getHome
)

export default indexRouter;