// Text constants
export const isRequired = (string) => `${string} is required`;

export const BAD_REQUEST = 'Bad Request';
export const PASSWORD_MIN_LENGTH = 'Password must be greater than 8 character'
export const PASSWORD_MAX_LENGTH = 'Password must be less than 30 character'
export const PASSWORD_IS_WEAK = 'Password must contain at least one uppercase and a special character (ex: !, @, # etc)'

export const STRONG_PASSWORD_REGEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
