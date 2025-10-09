import { ProfileStatus, SiteMode } from '@prisma/client'

export interface AdminProfileDto {
  id: string
  slug: string
  displayName: string
  headline: string | null
  summary: string | null
  status: ProfileStatus
  mode: SiteMode
  categoryId: string | null
  categoryName: string | null
  user: {
    id: string
    email: string
    phone: string | null
    isApproved: boolean
  }
  createdAt: Date
  updatedAt: Date
}

export interface ApproveProfileDto {
  approve: boolean
  reason?: string
}
