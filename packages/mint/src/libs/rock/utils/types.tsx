enum QueryKeys {
    addresses = 'addresses',
    orders = 'orders',
    products = 'products',
    recommendations = 'recommendations',
    tags = 'tags',
    brands = 'brands',
    categories = 'categories',
    reviews = 'reviews',
    carts = 'carts',
    users = 'users',
    stories = 'stories',
    forms = 'forms',
    localities = 'localities',
    states = 'states',
    countries = 'countries',
}

enum API_ROUTES {
    addresses = 'addresses',
    orders = 'orders',
    products = 'products',
    tags = 'tags',
    brands = 'brands',
    categories = 'categories',
    reviews = 'reviews',
    carts = 'carts',
    users = 'users',
    stories = 'stories',
    forms = 'forms',
    supports = 'supports',
    transactions = 'transactions',
    files = 'files',
    localities = 'addresses/localities',
    states = 'addresses/states',
    countries = 'addresses/countries',
}

enum ROUTES {
    products = '/products',
    carts = '/carts',
    orders = '/orders',
    forgot_password = '/forgot-password',
    login = '/login',
    reset_password = '/reset-password',
    signup = '/signup',
    verify = '/verify',
}

const PRIVATE_ROUTES = new Set([ROUTES.carts, ROUTES.orders])
// Provider hook that creates auth object and handles state
const AUTH_ROUTES = new Set([
    ROUTES.forgot_password,
    ROUTES.login,
    ROUTES.reset_password,
    ROUTES.signup,
    ROUTES.verify,
])

export { QueryKeys, API_ROUTES, ROUTES, PRIVATE_ROUTES, AUTH_ROUTES }
