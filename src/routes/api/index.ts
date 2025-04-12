import { Router, type Request, type Response } from 'express';
import userRouter from './user/user.router';

const apiRouter = Router();

apiRouter.get('/health-check', (_: Request, res: Response) => {
  res.send({ response: 'API is alive' });
});

apiRouter.use('/users', userRouter);

export default apiRouter;
