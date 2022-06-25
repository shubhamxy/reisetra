import * as PrismaErrors from './dberrors'
import * as ErrorCodes from './errorCodes'
export const errorCodes = {
  ...PrismaErrors,
  ...ErrorCodes,
} as const

export type ErrorType = keyof typeof errorCodes
export type ErrorCode = typeof errorCodes[ErrorType]

const ErrorTypes: Partial<Record<ErrorType, ErrorCode>> = {}

Object.keys(errorCodes).forEach((key: ErrorCode) => {
  ErrorTypes[errorCodes[key]] = key
})

export { ErrorTypes }
