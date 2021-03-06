import { NestMiddleware, HttpStatus, Injectable } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class Middleware implements NestMiddleware {
  constructor() {}
  async use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
