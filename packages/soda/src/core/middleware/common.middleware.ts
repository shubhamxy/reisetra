/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class Middleware implements NestMiddleware {
    constructor() {}

    async use(req: Request, res: Response, next: NextFunction) {
        next()
    }
}
