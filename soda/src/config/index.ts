import toJson from 'src/utils/yaml';

export const config = toJson(__dirname + '/../config.yml');

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const PORT = process.env.PORT || '8000';
export const API_PREFIX = 'api/v1';
export const API_VERSION = process.env.API_VERSION || '0.0.0';
export const REDIS_HOST = 'localhost';
export const REDIS_PORT = '6379';
export const API_HOST = 'localhost'
export const API_PROTOCOL = 'http';

export const API_URL = `${API_PROTOCOL}://${API_HOST}:${PORT}/${API_PREFIX}`;
export const FRONTEND_URL = `${API_PROTOCOL}://${API_HOST}:${PORT}/${API_PREFIX}`;

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
export const EMAIL_SENDER_NAME = 'My App';
// JWT
export const JWT_ACCESS_TOKEN_SECRET = 'secret';
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME = '30d';
export const JWT_REFRESH_TOKEN_SECRET = 'refresh secret';
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME = '1h';

export const AUDIENCE = 'localhost:8080';
export const SUBJECT = 'localhost:8080';
export const ISSUER = 'localhost:8080';

export const JWT_ACCESS_TOKEN_OPTIONS = {
  secret: JWT_ACCESS_TOKEN_SECRET,
  expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  // issuer: ISSUER,
  // subject: SUBJECT,
  // audience: AUDIENCE,
};

export const JWT_REFRESH_TOKEN_OPTIONS = {
  secret: JWT_REFRESH_TOKEN_SECRET,
  expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  // issuer: ISSUER,
  // subject: SUBJECT,
  // audience: AUDIENCE,
};

export const GOOGLE_OAUTH_OPTIONS = {
  clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_OAUTH_CLIENT_CALLBACK_URL,
  scope: ['email', 'profile'],
};
