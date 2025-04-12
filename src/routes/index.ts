import { Router, type Request, type Response } from 'express';
import userRouter from './user/user.router';

const router = Router();

// unauthenticated routes go here
router.get('/health-check', (_: Request, res: Response) => {
  res.send({ response: 'API is alive' });
});

router.use('/users', userRouter);

export default router;
