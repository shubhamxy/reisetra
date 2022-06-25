export const isRequired = (str: string) => `${str} is required`
export const isInvalid = (str: string) => `${str} is invalid`

export const mustBeOfType = (type: string, feild?: string) =>
  `${feild || 'feild'} must be of type ${type}`
export const mustBe = (type: string, feild?: string) =>
  `${feild || 'feild'} must be ${type}`

export const mustBeValidEnum = (e: any, feild?: string) =>
  `${feild || 'feild'} must be ${e ? Object.values(e).join(' | ') : ''}`

export const PASSWORD_MIN_LENGTH = 'Password must be greater than 8 character.'
export const PASSWORD_MAX_LENGTH = 'Password must be less than 30 character.'
export const PASSWORD_IS_WEAK =
  'Password must contain at least one uppercase and a special character (ex: !, @, # etc).'

export const STRONG_PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
export const PHONE_REGEX = /^\+[1-9]\d{1,14}$/
export const INVALID_PHONE = 'Invalid phone number.'
export const OTP_LENGTH = 'OTP must be 6 characters.'
