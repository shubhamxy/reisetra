export const REFRESH_TOKEN = 'REFRESH_TOKEN'
export const EMAIL_VERIFICATION_TOKEN = 'EMAIL_VERIFICATION_TOKEN'
export const FORGOT_PASSWORD_TOKEN = 'EMAIL_VERIFICATION_TOKEN'
export const UNSUBSCRIBE_TOKEN = 'UNSUBSCRIBE_VERIFICATION_TOKEN'
export const PHONE_VERIFICATION_OTP = 'PHONE_VERIFICATION_OTP'
export const ANONYMOUS_SESSION_ID = 'ANONYMOUS_SESSION_ID'

export function GET_REFRESH_TOKEN_KEY(id: string) {
  return `${REFRESH_TOKEN}_${id}`
}

export function GET_EMAIL_VERIFICATION_TOKEN_KEY(id: string) {
  return `${EMAIL_VERIFICATION_TOKEN}_${id}`
}

export function GET_FORGOT_PASSWORD_TOKEN_KEY(username: string) {
  return `${FORGOT_PASSWORD_TOKEN}_${username}`
}

export function GET_UNSUBSCRIBE_TOKEN_KEY(username: string) {
  return `${UNSUBSCRIBE_TOKEN}_${username}`
}

export function GET_PHONE_VERIFICATION_OTP_KEY(phone: string) {
  return `${PHONE_VERIFICATION_OTP}_${phone}`
}

export function GET_ANONYMOUS_SESSION_ID_KEY(id: string) {
  return `${ANONYMOUS_SESSION_ID}_${id}`
}
