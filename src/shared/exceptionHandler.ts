import { NextFunction, Request, Response } from 'express';

export function asyncWrapper(
  fn: (req: Request, res: Response) => Promise<any>,
): (req: Request, res: Response, next: NextFunction) => Promise<any> {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res);
    } catch (err) {
      next(err);
    }
  };
}
