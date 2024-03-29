import { Params as PinoConfig } from 'nestjs-pino'
import { createLogger, ILogzioLogger } from 'logzio-nodejs'
import { services } from './services'
import { STATUS_MESSAGE } from '@app/utils'
import app from './app'

const serviceEnv = services()
const appEnv = app()
let logger: ILogzioLogger
if (serviceEnv.logzio.enable) {
  // eslint-disable-next-line prefer-const
  logger = createLogger({
    supressErrors: true,
    token: serviceEnv.logzio.token,
    host: serviceEnv.logzio.host,
    protocol: 'https',
    port: '8071',
    type: 'nodejs',
  })
}

export const pinoConfig: PinoConfig = {
  pinoHttp: {
    autoLogging: true,
    customLogLevel: function (res, err) {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return 'warn'
      } else if (res.statusCode >= 500 || err) {
        return 'error'
      }
      return 'info'
    },
    customSuccessMessage: function (res) {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return `${res.statusCode} ${STATUS_MESSAGE[res.statusCode]}`.trim()
      }
      return `${res.statusCode} ${STATUS_MESSAGE[res.statusCode]}`.trim()
    },
    customErrorMessage: function (error, res) {
      return `${res.statusCode} ${STATUS_MESSAGE[res.statusCode]} ${
        error.message
      }`.trim()
    },
    genReqId: function (req) {
      return req.headers.requestid
    },
    prettyPrint: {
      colorize: appEnv.debug === 1 || !appEnv.isProduction,
      translateTime: 'dd-mm-yyyy HH:MM:ss.l',
      messageFormat: function messageFormat(log, messageKey) {
        let suffix = ''
        if (log.req) {
          log.ip =
            log.req.ip ||
            log.req.headers['x-forwarded-for'] ||
            (log.req.socket
              ? log.req.socket.remoteAddress
              : log.req.remoteAddress)
        }
        if (log.req && log.req.id) {
          suffix = `| ${log.req.id}`
        }
        if (log.responseTime) {
          suffix = `| ${log.responseTime}ms ${suffix}`
        }
        if (log.context) {
          suffix = `| ${log.context} ${suffix}`
        }
        if (log.req && log.req.method) {
          suffix = `| ${log.req.method} → ${log.req.url} ${suffix}`
        }
        if (log.level >= 50 && log.err) {
          suffix += `${suffix} \n${JSON.stringify(log.err, null, 4)}`
        }
        log.message = `${log[messageKey] || ''} ${suffix}`.trim()

        if (!log[messageKey]) {
          const { level, time, pid, hostname, message, ...other } = log
          log.message = JSON.stringify(other)
        }

        if (serviceEnv.logzio.enable) {
          logger.log(log)
        }

        return log.message
      },
      hideObject: appEnv.debug === 0,
      ignore: 'hostname,pid',
    },
  },
}

export { PinoConfig }
