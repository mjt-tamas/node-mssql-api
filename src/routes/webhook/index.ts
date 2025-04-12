import { Router, type Request, type Response } from 'express';

const webhookRouter = Router();

webhookRouter.get('/health-check', (_: Request, res: Response) => {
  res.send({ response: 'Webhook is listening' });
});

export default webhookRouter;
