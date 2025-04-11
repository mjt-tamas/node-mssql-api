import { Router, type Request, type Response } from 'express';

const router = Router();

// unauthenticated routes go here
router.get('/health-check', (_: Request, res: Response) => {
  res.send({ response: 'API is alive' });
});

export default router;
