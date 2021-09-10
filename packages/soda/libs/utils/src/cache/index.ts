export const REFRESH_TOKEN = 'REFRESH_TOKEN'
export const EMAIL_VERIFICATION_TOKEN = 'EMAIL_VERIFICATION_TOKEN'
export const FORGOT_PASSWORD_TOKEN = 'EMAIL_VERIFICATION_TOKEN'
export const UNSUBSCRIBE_TOKEN = 'UNSUBSCRIBE_VERIFICATION_TOKEN'

export function getRefreshTokenKey(id: string) {
  return `${REFRESH_TOKEN}_${id}`
}

export function getEmailVerificationTokenKey(id: string) {
  return `${EMAIL_VERIFICATION_TOKEN}_${id}`
}

export function getForgotPasswordKey(email: string) {
  return `${FORGOT_PASSWORD_TOKEN}_${email}`
}

export function getUnsubscribeKey(email: string) {
  return `${UNSUBSCRIBE_TOKEN}_${email}`
}
