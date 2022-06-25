export const REFRESH_TOKEN_EXPIRED = 'Refresh Token Expired.'
export const REFRESH_TOKEN_HEADER_KEY = 'x-refresh-token'
export const JWT_REFRESH_STRATEGY_NAME = 'jwt-refresh-strategy'
export const PHONE_VERIFICATION_FAILED = 'Phone Verification Failed.'
export const EMAIL_VERIFICATION_FAILED = 'Email Verification Failed.'
export const EMAIL_IS_INVALID = 'Email is invalid'
export const INVALID_RESET_TOKEN = 'Invalid Reset Token.'
export const USERNAME = 'username'
export const EMAIL = 'email'
export const PASSWORD = 'password'

export const USER_ID = 'userId'
export const BEARER = 'Bearer'
export const INVALID_TOKEN_FOR = (id, username, roles) =>
  `Invalid Token for id: ${id}, username: ${username}, roles: ${roles.toString()}`

export const OTP_SMS_MESSAGE = (otp) =>
  `${otp} is your OTP to login to Reisetra. Do not share it with anyone.`
export const USERNAME_PASSWORD_DOES_NOT_MATCH =
  'Username and password does not match'
export const EMAIL_PASSWORD_DOES_NOT_MATCH = 'Email and password does not match'
export const OTP_ALPHABETS = '0123456789'
