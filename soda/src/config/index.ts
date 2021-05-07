import toJson from "src/utils/yaml";
export const isProduction = process.env.NODE_ENV === 'production'
export const config = toJson(__dirname + "/../config.yml");
export const PORT = process.env.PORT || '8000'
export const API_PREFIX = 'api/v1'
export const API_VERSION = process.env.API_VERSION || '0.0.0'
export const REDIS_HOST = 'localhost'
export const REDIS_PORT = '6379'

export const AWS_BUCKET_NAME='soda-raw'
export const AWS_REGION='us-west-1'
export const AWS_ACCESS_KEY_ID='-'
export const AWS_SECRET_ACCESS_KEY=''
export const AWS_SES_ENDPOINT='https://email.us-west-2.amazonaws.com'
export const DEFAULT_EMAIL_SENDER='team@reisetra.com'


// JWT
export const JWT_ACCESS_TOKEN_SECRET = 'secret'
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME = '30d'
export const JWT_REFRESH_TOKEN_SECRET = 'refresh secret'
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME = '1h'

export const AUDIENCE = 'localhost:8080'
export const SUBJECT = 'localhost:8080'
export const ISSUER = 'localhost:8080'

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
}
