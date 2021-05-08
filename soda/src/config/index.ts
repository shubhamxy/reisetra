export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const SERVICE_NAME = process.env.SERVICE_NAME || 'soda';

// API
export const PORT = process.env.PORT || '8080';
export const API_PREFIX = process.env.API_PREFIX || 'api/v1';
export const API_VERSION = process.env.API_VERSION || 'v1';
export const API_HOST = process.env.API_HOST || 'localhost'
export const API_PROTOCOL = process.env.API_PROTOCOL || 'http';
export const API_URL = process.env.API_URL || `${API_PROTOCOL}://${API_HOST}:${PORT}/${API_PREFIX}`;

// FRONTEND
export const FRONTEND_URL = process.env.FRONTEND_URL || `${API_PROTOCOL}://${API_HOST}`;

// REDIS
export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PORT = process.env.REDIS_PORT || '6379';

// POSTGRES
export const DATABASE_URL = process.env.DATABASE_URL;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

// AWS
export const AWS_ACCESS_KEY_ID =  process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_KEY =  process.env.AWS_SECRET_KEY;
export const AWS_DEFAULT_REGION = process.env.AWS_S3_REGION;

// S3
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
export const AWS_S3_REGION = process.env.AWS_S3_REGION;

// SES
export const AWS_SES_ENDPOINT =  process.env.AWS_SES_ENDPOINT;
export const AWS_SES_DEFAULT_EMAIL_SENDER =  process.env.AWS_SES_DEFAULT_EMAIL_SENDER;
export const AWS_SES_REGION = process.env.AWS_SES_REGION;

// MAILER
export const EMAIL_SENDER_NAME = process.env.EMAIL_SENDER_NAME || 'Reisetra';

// JWT
export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME = process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME || '1h';

export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME = process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || '30d';

export const AUDIENCE = FRONTEND_URL;
export const ISSUER = FRONTEND_URL;

export const JWT_ACCESS_TOKEN_OPTIONS = {
  secret: JWT_ACCESS_TOKEN_SECRET,
  expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  issuer: ISSUER,
  audience: AUDIENCE,
};

export const JWT_REFRESH_TOKEN_OPTIONS = {
  secret: JWT_REFRESH_TOKEN_SECRET,
  expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  issuer: ISSUER,
  audience: AUDIENCE,
};

export const GOOGLE_OAUTH_OPTIONS = {
  clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_OAUTH_CLIENT_CALLBACK_URL,
  scope: ['email', 'profile'],
};
