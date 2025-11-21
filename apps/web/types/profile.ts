export interface DashboardProfile {
    id: string
    slug: string
    displayName: string
    headline: string | null
    summary: string | null
    status: 'PENDING_REVIEW' | 'APPROVED' | 'SUSPENDED' | 'REJECTED'
    mode: 'Personal' | 'Business'
    themeId: string | null
    themeConfig: Record<string, unknown>
    contact: {
        email: string | null
        phone: string | null
        website: string | null
        address: string | null
    }
    services: string[]
    sections: Record<string, unknown>
    metrics: {
        views30d: number
        enquiries30d: number
    }
    createdAt: string
    updatedAt: string
    category: string
}
