export interface AdminCategoryDto {
  id: string
  name: string
  slug: string
  description: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
