import { get, post, storage } from '../../utils'

export type LoginT = {
    readonly email: string
    readonly password: string
}
export type ResetPasswordT = {
    readonly email: string
    readonly token: string
    readonly password: string
}

export type SignupT = {
    email: string
    password: string
    name: string
    dateOfBirth?: Date
    phone?: string
    avatar?: string
    bio?: string
}
type Role = 'ADMIN' | 'USER'
export interface AuthResponse {
    id: string
    email: string
    admin: boolean
    roles: Role[]
    expires_in: string
    access_token: string
    refresh_token: string
    token_type: string
}

export function signupEmail(body: SignupT) {
    return post<LoginT, AuthResponse>('auth/email/signup', body)
}

export function loginEmail(body: LoginT) {
    return post<LoginT, AuthResponse>('auth/email/login', body)
}

export function loginEmailForgotPassword(email: string) {
    return get<AuthResponse>(`auth/email/forgot-password/${email}`)
}
export function loginEmailResetPassword(body: ResetPasswordT) {
    return post<ResetPasswordT, AuthResponse>('auth/email/reset-password', body)
}

export function loginOauth(provider = 'google') {
    return get<LoginT, AuthResponse>(`auth/login/oauth/${provider}`)
}

export function oauthGoogleVerify(body) {
    return post<LoginT, AuthResponse>(`auth/login/oauth/google/verify`, body)
}

export function emailVerify({ id, token }) {
    return get(`/auth/email/verify/${id}/${token}`)
}

export function refreshAuthToken({
    token,
    config,
}: {
    token?: string
    config?: any
}) {
    const refresh_token = token || storage.get.refresh_token()
    config = config || {}
    config.headers = config.headers || {}
    config.headers['X-Refresh-Token'] =
        config.headers['X-Refresh-Token'] || refresh_token
    return get<AuthResponse>(`auth/refresh`, config)
}
