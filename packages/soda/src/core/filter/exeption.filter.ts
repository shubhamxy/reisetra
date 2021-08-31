import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { app } from 'src/core/config'
import { ErrorResponse } from '../response'
import { stackObj } from '../../utils/errorUtils'
const config = app()

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        // const request = ctx.getRequest();
        if (exception instanceof HttpException) {
            const status = exception.getStatus()
            const responseObj: ErrorResponse = {
                message: 'Internal Server Error',
                meta: {},
            }

            const exeptionResponse = exception.getResponse() as any

            if (typeof exeptionResponse === 'string') {
                responseObj.message = exeptionResponse
            } else {
                // obj
                responseObj.message =
                    exception.message || exeptionResponse.error
                responseObj.errors = exeptionResponse.errors || []
            }

            if (!config.isProduction && exception) {
                // @ts-ignore
                responseObj.meta = exception.meta || {}
                responseObj.meta = {
                    // @ts-ignore
                    context: exception.context,
                    stack: stackObj(exception.stack),
                }
            }

            responseObj.success = false
            response.status(status).json(responseObj)
        } else {
            const status = HttpStatus.INTERNAL_SERVER_ERROR

            const responseObj: ErrorResponse = {
                message: 'Internal Server Error',
            }
            if (exception && exception.message) {
                responseObj.message = exception.message
            }
            if (!config.isProduction && exception) {
                responseObj.meta = exception.meta || {}
                responseObj.meta = {
                    context: exception.context,
                    stack: stackObj(exception.stack),
                }
            }
            responseObj.error = undefined
            responseObj.success = false
            response.status(status).json(responseObj)
        }
    }
}
