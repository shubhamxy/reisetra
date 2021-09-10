// In parse-sns-notification.middleware.ts
import * as bodyParser from 'body-parser'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class ParsePlainTextMiddleware implements NestMiddleware {
  // Parse text/plain content type for SNS notifications to work due to AWS setting
  //  incorrect  content type https://forums.aws.amazon.com/thread.jspa?threadID=69413
  use(req: Request, res: Response, next: NextFunction) {
    bodyParser.json({
      type: (request: any) =>
        request.get('Content-Type') === 'text/plain; charset=UTF-8',
      strict: false,
    })(req, res, next)
  }
}
