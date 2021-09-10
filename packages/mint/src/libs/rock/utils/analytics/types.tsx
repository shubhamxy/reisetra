import { UserProfile } from '../../api'
import { config } from '../../config'

/**
 * @description Mixpanel events types
 */
export enum Events {
    login = 'Login',
    logout = 'Logout',
    identify = 'Identify',
    signup = 'Sign Up',
    page_loaded = 'Page Loaded',
    metrics = 'Metrics',
    file_upload = 'File Upload',
    click = 'Click',
    scroll_depth = 'Scroll Depth',
}

export enum Properties {
    page_viewed = '$page_viewed',
}

export enum User {
    name = '$name',
    email = '$email',
    avatar = '$avatar',
    phone = '$phone',
    date_of_birth = '$date_of_birth',
    active = '$active',
    user_state = '$user_state',
    user_roles = '$user_roles',
    created_at = '$created',
    updated_at = '$updated',
}

export const mapUserProperties = (user: Partial<UserProfile>) => ({
    [User.avatar]: user.avatar,
    [User.email]: user.email,
    [User.name]: user.name,
    [User.phone]: user.phone,
    [User.date_of_birth]: user.dateOfBirth ? user.dateOfBirth.toString() : '',
    [User.active]: true,
    [User.created_at]: user.createdAt ? user.createdAt.toString() : '',
    [User.updated_at]: user.updatedAt ? user.updatedAt.toString() : '',
    [User.user_roles]: user.roles.toString(),
})

// eslint-disable-next-line camelcase
export const initialProps = {
    $client_version: config.version,
}

export enum UserState {
    logged_out = 'Logged Out',
    logged_in = 'Logged In',
}
