import { Inject, Logger } from '@nestjs/common'

export function LogParams() {
  const injectLogger = Inject(Logger)

  return (
    target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    injectLogger(target, 'logger')

    const originalMethod = propertyDescriptor.value

    propertyDescriptor.value = async function (...args: any[]) {
      const loggerService: Logger = this.logger
      try {
        loggerService.log(
          JSON.stringify(args, null, 2),
          `${target.constructor.name}.${originalMethod.name}`
        )
        return await originalMethod.apply(this, args)
      } catch (error) {
        const context = `${target.constructor.name}.${originalMethod.name}${
          error.context ? ':' + error.context : ''
        }`
        loggerService.error(error.message, error.stack, context)
        loggerService.log(JSON.stringify(args, null, 2), context)
        // rethrow error
        throw error
      }
    }
  }
}
