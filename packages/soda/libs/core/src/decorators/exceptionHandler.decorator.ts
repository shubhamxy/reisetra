import { HttpStatus, Inject, Logger } from '@nestjs/common'
import { CustomException } from '@app/core'
import { stringify } from '@app/utils'

export function ExceptionHandler() {
  const injectLogger = Inject(Logger)

  return (
    target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    injectLogger(target, 'logger')

    const originalMethod = propertyDescriptor.value

    propertyDescriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args)
      } catch (error) {
        const context = `${target.constructor.name}.${originalMethod.name}${
          error.context ? ':' + error.context : ''
        }`
        this.logger.error(error.message, error.stack, context)
        this.logger.error(stringify(args, null, 2), context)
        // rethrow error
        throw new CustomException(
          error,
          error.status || HttpStatus.BAD_REQUEST,
          context
        )
      }
    }
  }
}
