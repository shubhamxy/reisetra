
export const isRequired = (str: string) => `${str} is required`;
export const isInvalid = (str: string) => `${str} is invalid`;

export const mustBeOfType = (type: string, feild?: string) =>
  `${feild || 'feild'} must be of type ${type}`;
export const mustBe = (type: string, feild?: string) =>
  `${feild || 'feild'} must be ${type}`;

export const mustBeValidEnum = (e: any, feild?: string) =>
  `${feild || 'feild'} must be ${Object.values(e).join(' | ')}`;

export const PASSWORD_MIN_LENGTH = 'Password must be greater than 8 character.';
export const PASSWORD_MAX_LENGTH = 'Password must be less than 30 character.';
export const PASSWORD_IS_WEAK =
  'Password must contain at least one uppercase and a special character (ex: !, @, # etc).';

export const STRONG_PASSWORD_REGEX = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);
export const PHONE_REGEX = new RegExp(/^\+[1-9]\d{1,14}$/);
export const INVALID_PHONE = 'Invalid phone number.';
