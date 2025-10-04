import { ProfileStatus, SiteMode, UserRole } from '@prisma/client'

export interface AuthUser {
  id: string
  email: string
  phone?: string | null
  role: UserRole
  isApproved: boolean
  profile?: {
    id: string
    slug: string
    displayName: string
    status: ProfileStatus
    mode: SiteMode
    headline?: string | null
    summary?: string | null
  } | null
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse extends AuthTokens {
  user: AuthUser
}
