import { Params } from 'nestjs-pino';
import { statusText } from '../utils/statusText';

const icons = {
  10: '🔵',
  20: '🔵',
  30: 'ℹ️',
  40: '👀',
  50: '🚨',
  60: '🔴',
};

export const pinoConfig: Params = {
  pinoHttp: {
    customLogLevel: function (res, err) {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return 'warn';
      } else if (res.statusCode >= 500 || err) {
        return 'error';
      }
      return 'info';
    },
    customSuccessMessage: function (res) {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return `${res.statusCode} ${statusText[res.statusCode]} `;
      }
      return `${res.statusCode} ${statusText[res.statusCode]}`;
    },
    customErrorMessage: function (error, res) {
      return `${res.statusCode} ${statusText[res.statusCode]} | 🚦 ${error.message}`;
    },
    genReqId: function (req) {
      return req.headers['requestid'];
    },
    prettyPrint: {
      colorize: true,
      crlf: true,
      translateTime: 'dd-mm-yyyy HH:MM:ss.l',
      messageFormat: function (log) {
        // return ''
        let suffix = '';
        if (log['req'] && log['req']['id'])
          suffix = `| 👨‍💻 ${log['req']['id']}`;
        if (log['responseTime'])
          suffix = `| ✨ ${log['responseTime']}ms ${suffix}`;
        if (log['context'])
          suffix = `| ${log['context']} ${suffix}`;
        if (log['req'] && log['req']['method'])
          suffix = `| ${log['req']['method']} | ${log['req']['url']} ${suffix}`;
        if (log['level'] >= 50 && log['err'])
          suffix += `${suffix} \n🚦 ${JSON.stringify(log.err, null, 4)}`;
        return `${icons[log['level']]}  → ${log['msg']} ${suffix}`;
      },
      hideObject: true,
      ignore: 'hostname,pid',
    },
  },
};
