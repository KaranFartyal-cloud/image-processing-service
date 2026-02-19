import type { Request, Response, NextFunction } from "express";

type AsyncHanlder = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void | Response> | void | Response;

const asyncHandler = (fn: AsyncHanlder) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
