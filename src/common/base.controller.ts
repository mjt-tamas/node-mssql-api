import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export abstract class BaseController {
  protected constructor() {}

  public handler = <
    ParamsZod extends z.ZodType,
    BodyZod extends z.ZodType,
    QueryZod extends z.ZodType,
  >(
    validators: {
      params?: ParamsZod | ((req: Request) => Promise<z.output<ParamsZod>>);
      body?: BodyZod | ((req: Request) => Promise<z.output<BodyZod>>);
      query?: QueryZod | ((req: Request) => Promise<z.output<QueryZod>>);
    },
    callback: (
      req: Request<
        z.output<ParamsZod>,
        {},
        z.output<BodyZod>,
        z.output<QueryZod>
      >,
      res: Response,
    ) => Response | Promise<Response> | Promise<void>,
  ) => {
    return async (
      req: Request<
        z.output<ParamsZod>,
        {},
        z.output<BodyZod>,
        z.output<QueryZod>
      >,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        if (validators.params) {
          if (typeof validators.params === 'function') {
            req.params = await validators.params(req);
          } else {
            req.params = validators.params.parse(
              req.params,
            ) as z.output<ParamsZod>;
          }
        }
        if (validators.body) {
          let body: z.output<BodyZod>;
          if (typeof validators.body === 'function') {
            body = await validators.body(req);
          } else {
            body = validators.body.parse(req.body) as z.output<BodyZod>;
          }
          overrideProperty(req, 'body', body);
        }
        if (validators.query) {
          let query: z.output<QueryZod>;
          if (typeof validators.query === 'function') {
            query = await validators.query(req);
          } else {
            query = validators.query.parse(req.query) as z.output<QueryZod>;
          }
          overrideProperty(req, 'query', query);
        }
        await callback(req, res);
      } catch (e) {
        console.error(e);
        return next(e);
      }
    };
  };
}

function overrideProperty<T, V>(obj: T, key: string, value: V) {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: () => value,
  });
  return obj as T & { [key: string]: V };
}
