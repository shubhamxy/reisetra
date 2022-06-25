import { Inject, Logger } from '@nestjs/common'
import { AppError, UniqueConstraintViolation } from '@app/core'
import { USER_EMAIL_ALREADY_EXISTS } from '@app/user/user.const'
import { stringify } from '@app/utils'

export function ErrorHandler() {
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
        this.logger.error(
          stringify(args, null, 2, {
            redactedKeys: [/na*/, /widget(s?)added/i],
            redactedPaths: ['meta'],
          }),
          context
        )
        let message: string = error?.meta?.cause || error.message
        if (error.code === UniqueConstraintViolation) {
          message = USER_EMAIL_ALREADY_EXISTS
        }
        // rethrow error
        throw new AppError(error?.meta?.cause || message, error.code, context)
      }
    }
  }
}
