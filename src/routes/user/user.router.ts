import { Router } from 'express';
import userController from './user.controller';

const userRouter = Router();

userRouter.post('/', userController.create);
userRouter.get('/', userController.list);
userRouter.get('/:id', userController.getById);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.delete);

export default userRouter;
