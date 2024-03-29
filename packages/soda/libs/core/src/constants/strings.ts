export enum Routes {
  healthz = '/healthz',
  utils = '/_utils',
  auth = '/auth',
  refresh = '/refresh',
  login_oauth_google = '/login/oauth/google',
  login_oauth_google_redirect = '/login/oauth/google/redirect',
  login_oauth_google_verify = '/login/oauth/google/verify',
  email_signup = '/email/signup',
  email_login = '/email/login',
  phone_login = '/phone/login',
  phone_otp = '/phone/otp',
  email_verify_by_username_and_token = '/email/verify/:username/:token',
  auth_email_resend_verification = '/email/resend-verification',
  email_forgot_password_by_email = '/email/forgot-password/:email',
  email_reset_password_by_email_and_token = '/email/reset-password/:email/:token',
  email_reset_password = '/email/reset-password',
  email_update_password = '/email/update-password',

  users = '/users',
  users_all = '/all',
  users_by_username = '/:username',

  addresses = '/addresses',
  addresses_all = '/all',
  addresses_by_addressId = '/:addressId',
  countries = '/countries',
  localities = '/localities',
  states = '/states',

  brands = '/brands',

  carts = '/carts',
  carts_all = '/all',
  carts_by_anon_cartId = '/anonymous/:cartId',
  carts_by_cartId = '/:cartId',
  carts_checkout = '/checkout',
  carts_by_cartId_and_productId = '/:cartId/:productId',

  transactions = '/transactions',
  transactions_all = '/all',
  transactions_by_transactionId = '/:transactionId',

  categories = '/categories',

  files = '/files',
  files_all = '/all',
  files_by_id = '/:id',

  inventories = '/inventories',
  inventories_all = '/all',
  inventories_by_id = '/:id',

  orders = '/orders',
  orders_all = '/all',
  orders_by_orderId = '/:orderId',
  orders_by_orderId_documents = '/:orderId/documents',
  orders_by_orderId_cancel = '/:orderId/cancel',

  products = '/products',
  products_all = '/all',
  products_by_slug = '/:slug',
  products_by_productId = '/:productId',
  products_recommendations = '/recommendations',

  reviews = '/reviews',
  reviews_all = '/all',
  reviews_by_productId = '/:productId',
  reviews_by_reviewId = '/:reviewId',

  stories = '/stories',
  stories_all = '/all',
  stories_by_slug = '/:slug',
  stories_by_storyId = '/:storyId',

  supports = '/supports',
  supports_all = '/all',
  support_by_ticketId = '/:ticketId',

  notification = '/notifications',
  bounce = '/bounces',
  complaint = '/complaints',
  delivery = '/deliveries',
  unsubscribe = '/unsubscribe',
  sms = '/sms',

  forms = '/forms',
  forms_by_formId = '/:formId',

  tags = '/tags',
  tags_all = '/all',

  offers = '/offers',
  offers_all = '/all',
}

export enum Message {
  success = 'Success',
  created = 'Created',
  updated = 'Updated',
  redirected = 'Redirected',
  failed = 'Failed',
}
