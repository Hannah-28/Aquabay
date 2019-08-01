import express from 'express';
import AdminController from '../controllers/AdminController';

const adminRouter = express.Router();

adminRouter.post(
    '/admin/adduser',
    AdminController.addUser
)


export default adminRouter;