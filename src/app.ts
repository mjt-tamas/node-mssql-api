import express, {
  json,
  urlencoded,
  Request,
  Response,
  NextFunction,
  type RequestHandler,
  type ErrorRequestHandler,
} from 'express';
import morganBody from 'morgan-body';
import cors from 'cors';
import router from '~/routes';
import headersMiddleware from '~/middleware/headers.middleware';
import errorMiddleware from '~/middleware/error.middleware';
import { errors } from '~/middleware/exception.middleware';
import webhookRouter from '~/routes/webhook';

const app = express();
app.use('/webhook', webhookRouter);

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
morganBody(app, {
  logResponseBody: false,
  logRequestBody: false,
  filterParameters: [
    'password',
    'token',
    'refreshToken',
    'refresh_token',
    'access_token',
    'accessToken',
    'auth',
    'authorization',
  ],
  prettify: false,
  includeNewLine: true,
});

app.use(json({ limit: '450kb' }));
app.use(urlencoded({ extended: false }));

app.use(headersMiddleware as RequestHandler);

app.use(router);
app.use('*splat', (req: Request, res: Response, next: NextFunction) => {
  next(errors.notFound('path'));
});
app.use(errorMiddleware);

// app.use(errorMiddleware);

// app.use(error);

export default app;
