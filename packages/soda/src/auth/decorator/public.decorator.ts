import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

export const IS_LOCAL_AUTHENTICATED = 'isLocalAuthenticated'
export const Local = () => SetMetadata(IS_LOCAL_AUTHENTICATED, true)
