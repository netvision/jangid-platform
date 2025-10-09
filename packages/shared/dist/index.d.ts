import { z } from 'zod';

declare const siteModeSchema: z.ZodEnum<["CARD", "BROCHURE"]>;
declare const profileSectionSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    type: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    mediaUrl: z.ZodOptional<z.ZodString>;
    ctaLabel: z.ZodOptional<z.ZodString>;
    ctaHref: z.ZodOptional<z.ZodString>;
    order: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: string;
    order: number;
    id?: string | undefined;
    title?: string | undefined;
    content?: string | undefined;
    mediaUrl?: string | undefined;
    ctaLabel?: string | undefined;
    ctaHref?: string | undefined;
}, {
    type: string;
    order: number;
    id?: string | undefined;
    title?: string | undefined;
    content?: string | undefined;
    mediaUrl?: string | undefined;
    ctaLabel?: string | undefined;
    ctaHref?: string | undefined;
}>;
declare const profileSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    slug: z.ZodString;
    displayName: z.ZodString;
    headline: z.ZodOptional<z.ZodString>;
    summary: z.ZodOptional<z.ZodString>;
    mode: z.ZodDefault<z.ZodEnum<["CARD", "BROCHURE"]>>;
    categorySlug: z.ZodOptional<z.ZodString>;
    themeSlug: z.ZodOptional<z.ZodString>;
    socialLinks: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
    sections: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        type: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
        mediaUrl: z.ZodOptional<z.ZodString>;
        ctaLabel: z.ZodOptional<z.ZodString>;
        ctaHref: z.ZodOptional<z.ZodString>;
        order: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: string;
        order: number;
        id?: string | undefined;
        title?: string | undefined;
        content?: string | undefined;
        mediaUrl?: string | undefined;
        ctaLabel?: string | undefined;
        ctaHref?: string | undefined;
    }, {
        type: string;
        order: number;
        id?: string | undefined;
        title?: string | undefined;
        content?: string | undefined;
        mediaUrl?: string | undefined;
        ctaLabel?: string | undefined;
        ctaHref?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    displayName: string;
    mode: "CARD" | "BROCHURE";
    socialLinks: Record<string, string>;
    sections: {
        type: string;
        order: number;
        id?: string | undefined;
        title?: string | undefined;
        content?: string | undefined;
        mediaUrl?: string | undefined;
        ctaLabel?: string | undefined;
        ctaHref?: string | undefined;
    }[];
    id?: string | undefined;
    headline?: string | undefined;
    summary?: string | undefined;
    categorySlug?: string | undefined;
    themeSlug?: string | undefined;
}, {
    slug: string;
    displayName: string;
    id?: string | undefined;
    headline?: string | undefined;
    summary?: string | undefined;
    mode?: "CARD" | "BROCHURE" | undefined;
    categorySlug?: string | undefined;
    themeSlug?: string | undefined;
    socialLinks?: Record<string, string> | undefined;
    sections?: {
        type: string;
        order: number;
        id?: string | undefined;
        title?: string | undefined;
        content?: string | undefined;
        mediaUrl?: string | undefined;
        ctaLabel?: string | undefined;
        ctaHref?: string | undefined;
    }[] | undefined;
}>;
type ProfileInput = z.infer<typeof profileSchema>;
type ProfileSectionInput = z.infer<typeof profileSectionSchema>;
type SiteMode = z.infer<typeof siteModeSchema>;

declare const categorySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    slug: string;
    name: string;
    description?: string | null | undefined;
}, {
    id: string;
    slug: string;
    name: string;
    description?: string | null | undefined;
}>;
declare const categoriesResponseSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    slug: string;
    name: string;
    description?: string | null | undefined;
}, {
    id: string;
    slug: string;
    name: string;
    description?: string | null | undefined;
}>, "many">;
type Category = z.infer<typeof categorySchema>;
type CategoryList = z.infer<typeof categoriesResponseSchema>;

declare const metricCardSchema: z.ZodObject<{
    label: z.ZodString;
    value: z.ZodString;
    delta: z.ZodString;
    trend: z.ZodDefault<z.ZodEnum<["up", "down", "neutral"]>>;
    updatedAgo: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    label: string;
    delta: string;
    trend: "up" | "down" | "neutral";
    updatedAgo: string;
}, {
    value: string;
    label: string;
    delta: string;
    updatedAgo: string;
    trend?: "up" | "down" | "neutral" | undefined;
}>;
declare const pendingProfileCardSchema: z.ZodObject<{
    id: z.ZodString;
    displayName: z.ZodString;
    category: z.ZodString;
    submittedAgo: z.ZodString;
    contactEmail: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high"]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    displayName: string;
    category: string;
    submittedAgo: string;
    priority: "low" | "medium" | "high";
    contactEmail?: string | undefined;
    phone?: string | undefined;
}, {
    id: string;
    displayName: string;
    category: string;
    submittedAgo: string;
    contactEmail?: string | undefined;
    phone?: string | undefined;
    priority?: "low" | "medium" | "high" | undefined;
}>;
declare const signalItemSchema: z.ZodObject<{
    title: z.ZodString;
    message: z.ZodString;
    severity: z.ZodEnum<["info", "success", "warning"]>;
}, "strip", z.ZodTypeAny, {
    title: string;
    message: string;
    severity: "info" | "success" | "warning";
}, {
    title: string;
    message: string;
    severity: "info" | "success" | "warning";
}>;
declare const signupRowSchema: z.ZodObject<{
    id: z.ZodString;
    business: z.ZodString;
    owner: z.ZodString;
    category: z.ZodString;
    status: z.ZodEnum<["APPROVED", "PENDING_REVIEW", "DRAFT"]>;
    statusLabel: z.ZodString;
    joinedAgo: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "APPROVED" | "PENDING_REVIEW" | "DRAFT";
    category: string;
    business: string;
    owner: string;
    statusLabel: string;
    joinedAgo: string;
}, {
    id: string;
    status: "APPROVED" | "PENDING_REVIEW" | "DRAFT";
    category: string;
    business: string;
    owner: string;
    statusLabel: string;
    joinedAgo: string;
}>;
declare const quickActionSchema: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
    description: z.ZodString;
    href: z.ZodString;
    ctaLabel: z.ZodString;
    tone: z.ZodDefault<z.ZodEnum<["primary", "neutral", "destructive"]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    ctaLabel: string;
    description: string;
    label: string;
    href: string;
    tone: "neutral" | "primary" | "destructive";
}, {
    id: string;
    ctaLabel: string;
    description: string;
    label: string;
    href: string;
    tone?: "neutral" | "primary" | "destructive" | undefined;
}>;
declare const healthCheckSchema: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<["pass", "warn", "fail"]>>;
    message: z.ZodString;
    updatedAgo: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    message: string;
    status: "pass" | "warn" | "fail";
    label: string;
    updatedAgo: string;
}, {
    id: string;
    message: string;
    label: string;
    updatedAgo: string;
    status?: "pass" | "warn" | "fail" | undefined;
}>;
declare const activityItemSchema: z.ZodObject<{
    id: z.ZodString;
    actor: z.ZodString;
    action: z.ZodString;
    target: z.ZodString;
    timestampAgo: z.ZodString;
    severity: z.ZodEnum<["info", "success", "warning"]>;
    icon: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    severity: "info" | "success" | "warning";
    actor: string;
    action: string;
    target: string;
    timestampAgo: string;
    icon?: string | undefined;
}, {
    id: string;
    severity: "info" | "success" | "warning";
    actor: string;
    action: string;
    target: string;
    timestampAgo: string;
    icon?: string | undefined;
}>;
declare const superAdminDashboardSchema: z.ZodObject<{
    generatedAt: z.ZodString;
    metrics: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodString;
        delta: z.ZodString;
        trend: z.ZodDefault<z.ZodEnum<["up", "down", "neutral"]>>;
        updatedAgo: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        label: string;
        delta: string;
        trend: "up" | "down" | "neutral";
        updatedAgo: string;
    }, {
        value: string;
        label: string;
        delta: string;
        updatedAgo: string;
        trend?: "up" | "down" | "neutral" | undefined;
    }>, "many">;
    pendingProfiles: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        displayName: z.ZodString;
        category: z.ZodString;
        submittedAgo: z.ZodString;
        contactEmail: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high"]>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        displayName: string;
        category: string;
        submittedAgo: string;
        priority: "low" | "medium" | "high";
        contactEmail?: string | undefined;
        phone?: string | undefined;
    }, {
        id: string;
        displayName: string;
        category: string;
        submittedAgo: string;
        contactEmail?: string | undefined;
        phone?: string | undefined;
        priority?: "low" | "medium" | "high" | undefined;
    }>, "many">;
    signals: z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        message: z.ZodString;
        severity: z.ZodEnum<["info", "success", "warning"]>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        message: string;
        severity: "info" | "success" | "warning";
    }, {
        title: string;
        message: string;
        severity: "info" | "success" | "warning";
    }>, "many">;
    latestSignups: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        business: z.ZodString;
        owner: z.ZodString;
        category: z.ZodString;
        status: z.ZodEnum<["APPROVED", "PENDING_REVIEW", "DRAFT"]>;
        statusLabel: z.ZodString;
        joinedAgo: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: "APPROVED" | "PENDING_REVIEW" | "DRAFT";
        category: string;
        business: string;
        owner: string;
        statusLabel: string;
        joinedAgo: string;
    }, {
        id: string;
        status: "APPROVED" | "PENDING_REVIEW" | "DRAFT";
        category: string;
        business: string;
        owner: string;
        statusLabel: string;
        joinedAgo: string;
    }>, "many">;
    quickActions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        description: z.ZodString;
        href: z.ZodString;
        ctaLabel: z.ZodString;
        tone: z.ZodDefault<z.ZodEnum<["primary", "neutral", "destructive"]>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        ctaLabel: string;
        description: string;
        label: string;
        href: string;
        tone: "neutral" | "primary" | "destructive";
    }, {
        id: string;
        ctaLabel: string;
        description: string;
        label: string;
        href: string;
        tone?: "neutral" | "primary" | "destructive" | undefined;
    }>, "many">;
    healthChecks: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        status: z.ZodDefault<z.ZodEnum<["pass", "warn", "fail"]>>;
        message: z.ZodString;
        updatedAgo: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        message: string;
        status: "pass" | "warn" | "fail";
        label: string;
        updatedAgo: string;
    }, {
        id: string;
        message: string;
        label: string;
        updatedAgo: string;
        status?: "pass" | "warn" | "fail" | undefined;
    }>, "many">;
    recentActivity: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        actor: z.ZodString;
        action: z.ZodString;
        target: z.ZodString;
        timestampAgo: z.ZodString;
        severity: z.ZodEnum<["info", "success", "warning"]>;
        icon: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        severity: "info" | "success" | "warning";
        actor: string;
        action: string;
        target: string;
        timestampAgo: string;
        icon?: string | undefined;
    }, {
        id: string;
        severity: "info" | "success" | "warning";
        actor: string;
        action: string;
        target: string;
        timestampAgo: string;
        icon?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    generatedAt: string;
    metrics: {
        value: string;
        label: string;
        delta: string;
        trend: "up" | "down" | "neutral";
        updatedAgo: string;
    }[];
    pendingProfiles: {
        id: string;
        displayName: string;
        category: string;
        submittedAgo: string;
        priority: "low" | "medium" | "high";
        contactEmail?: string | undefined;
        phone?: string | undefined;
    }[];
    signals: {
        title: string;
        message: string;
        severity: "info" | "success" | "warning";
    }[];
    latestSignups: {
        id: string;
        status: "APPROVED" | "PENDING_REVIEW" | "DRAFT";
        category: string;
        business: string;
        owner: string;
        statusLabel: string;
        joinedAgo: string;
    }[];
    quickActions: {
        id: string;
        ctaLabel: string;
        description: string;
        label: string;
        href: string;
        tone: "neutral" | "primary" | "destructive";
    }[];
    healthChecks: {
        id: string;
        message: string;
        status: "pass" | "warn" | "fail";
        label: string;
        updatedAgo: string;
    }[];
    recentActivity: {
        id: string;
        severity: "info" | "success" | "warning";
        actor: string;
        action: string;
        target: string;
        timestampAgo: string;
        icon?: string | undefined;
    }[];
}, {
    generatedAt: string;
    metrics: {
        value: string;
        label: string;
        delta: string;
        updatedAgo: string;
        trend?: "up" | "down" | "neutral" | undefined;
    }[];
    pendingProfiles: {
        id: string;
        displayName: string;
        category: string;
        submittedAgo: string;
        contactEmail?: string | undefined;
        phone?: string | undefined;
        priority?: "low" | "medium" | "high" | undefined;
    }[];
    signals: {
        title: string;
        message: string;
        severity: "info" | "success" | "warning";
    }[];
    latestSignups: {
        id: string;
        status: "APPROVED" | "PENDING_REVIEW" | "DRAFT";
        category: string;
        business: string;
        owner: string;
        statusLabel: string;
        joinedAgo: string;
    }[];
    quickActions: {
        id: string;
        ctaLabel: string;
        description: string;
        label: string;
        href: string;
        tone?: "neutral" | "primary" | "destructive" | undefined;
    }[];
    healthChecks: {
        id: string;
        message: string;
        label: string;
        updatedAgo: string;
        status?: "pass" | "warn" | "fail" | undefined;
    }[];
    recentActivity: {
        id: string;
        severity: "info" | "success" | "warning";
        actor: string;
        action: string;
        target: string;
        timestampAgo: string;
        icon?: string | undefined;
    }[];
}>;
type MetricCard = z.infer<typeof metricCardSchema>;
type PendingProfileCard = z.infer<typeof pendingProfileCardSchema>;
type SignalItem = z.infer<typeof signalItemSchema>;
type SignupRow = z.infer<typeof signupRowSchema>;
type QuickAction = z.infer<typeof quickActionSchema>;
type HealthCheck = z.infer<typeof healthCheckSchema>;
type ActivityItem = z.infer<typeof activityItemSchema>;
type SuperAdminDashboard = z.infer<typeof superAdminDashboardSchema>;

declare const themeConfigSchema: z.ZodCatch<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
declare const themeSchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    thumbnail: z.ZodNullable<z.ZodString>;
    configSchema: z.ZodCatch<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    thumbnail: string | null;
    configSchema: Record<string, unknown>;
}, {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    thumbnail: string | null;
    configSchema?: unknown;
}>;
declare const themesResponseSchema: z.ZodObject<{
    themes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        thumbnail: z.ZodNullable<z.ZodString>;
        configSchema: z.ZodCatch<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        slug: string;
        name: string;
        description: string | null;
        thumbnail: string | null;
        configSchema: Record<string, unknown>;
    }, {
        id: string;
        slug: string;
        name: string;
        description: string | null;
        thumbnail: string | null;
        configSchema?: unknown;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    themes: {
        id: string;
        slug: string;
        name: string;
        description: string | null;
        thumbnail: string | null;
        configSchema: Record<string, unknown>;
    }[];
}, {
    themes: {
        id: string;
        slug: string;
        name: string;
        description: string | null;
        thumbnail: string | null;
        configSchema?: unknown;
    }[];
}>;
type ThemeResponse = z.infer<typeof themeSchema>;
type ThemesResponse = z.infer<typeof themesResponseSchema>;

declare const dashboardProfileSchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    displayName: z.ZodString;
    headline: z.ZodNullable<z.ZodString>;
    summary: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<["DRAFT", "PENDING_REVIEW", "APPROVED", "SUSPENDED"]>;
    mode: z.ZodEnum<["CARD", "BROCHURE"]>;
    themeId: z.ZodNullable<z.ZodString>;
    themeConfig: z.ZodCatch<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    contact: z.ZodObject<{
        email: z.ZodNullable<z.ZodString>;
        phone: z.ZodNullable<z.ZodString>;
        website: z.ZodNullable<z.ZodString>;
        address: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string | null;
        phone: string | null;
        website: string | null;
        address: string | null;
    }, {
        email: string | null;
        phone: string | null;
        website: string | null;
        address: string | null;
    }>;
    services: z.ZodArray<z.ZodString, "many">;
    sections: z.ZodCatch<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    metrics: z.ZodObject<{
        views30d: z.ZodNumber;
        enquiries30d: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        views30d: number;
        enquiries30d: number;
    }, {
        views30d: number;
        enquiries30d: number;
    }>;
    createdAt: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    updatedAt: z.ZodUnion<[z.ZodString, z.ZodDate]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "APPROVED" | "PENDING_REVIEW" | "DRAFT" | "SUSPENDED";
    slug: string;
    displayName: string;
    headline: string | null;
    summary: string | null;
    mode: "CARD" | "BROCHURE";
    sections: Record<string, unknown>;
    metrics: {
        views30d: number;
        enquiries30d: number;
    };
    themeId: string | null;
    themeConfig: Record<string, unknown>;
    contact: {
        email: string | null;
        phone: string | null;
        website: string | null;
        address: string | null;
    };
    services: string[];
    createdAt: string | Date;
    updatedAt: string | Date;
}, {
    id: string;
    status: "APPROVED" | "PENDING_REVIEW" | "DRAFT" | "SUSPENDED";
    slug: string;
    displayName: string;
    headline: string | null;
    summary: string | null;
    mode: "CARD" | "BROCHURE";
    metrics: {
        views30d: number;
        enquiries30d: number;
    };
    themeId: string | null;
    contact: {
        email: string | null;
        phone: string | null;
        website: string | null;
        address: string | null;
    };
    services: string[];
    createdAt: string | Date;
    updatedAt: string | Date;
    sections?: unknown;
    themeConfig?: unknown;
}>;
declare const dashboardProfileResponseSchema: z.ZodObject<{
    profile: z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        displayName: z.ZodString;
        headline: z.ZodNullable<z.ZodString>;
        summary: z.ZodNullable<z.ZodString>;
        status: z.ZodEnum<["DRAFT", "PENDING_REVIEW", "APPROVED", "SUSPENDED"]>;
        mode: z.ZodEnum<["CARD", "BROCHURE"]>;
        themeId: z.ZodNullable<z.ZodString>;
        themeConfig: z.ZodCatch<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        contact: z.ZodObject<{
            email: z.ZodNullable<z.ZodString>;
            phone: z.ZodNullable<z.ZodString>;
            website: z.ZodNullable<z.ZodString>;
            address: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            email: string | null;
            phone: string | null;
            website: string | null;
            address: string | null;
        }, {
            email: string | null;
            phone: string | null;
            website: string | null;
            address: string | null;
        }>;
        services: z.ZodArray<z.ZodString, "many">;
        sections: z.ZodCatch<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        metrics: z.ZodObject<{
            views30d: z.ZodNumber;
            enquiries30d: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            views30d: number;
            enquiries30d: number;
        }, {
            views30d: number;
            enquiries30d: number;
        }>;
        createdAt: z.ZodUnion<[z.ZodString, z.ZodDate]>;
        updatedAt: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: "APPROVED" | "PENDING_REVIEW" | "DRAFT" | "SUSPENDED";
        slug: string;
        displayName: string;
        headline: string | null;
        summary: string | null;
        mode: "CARD" | "BROCHURE";
        sections: Record<string, unknown>;
        metrics: {
            views30d: number;
            enquiries30d: number;
        };
        themeId: string | null;
        themeConfig: Record<string, unknown>;
        contact: {
            email: string | null;
            phone: string | null;
            website: string | null;
            address: string | null;
        };
        services: string[];
        createdAt: string | Date;
        updatedAt: string | Date;
    }, {
        id: string;
        status: "APPROVED" | "PENDING_REVIEW" | "DRAFT" | "SUSPENDED";
        slug: string;
        displayName: string;
        headline: string | null;
        summary: string | null;
        mode: "CARD" | "BROCHURE";
        metrics: {
            views30d: number;
            enquiries30d: number;
        };
        themeId: string | null;
        contact: {
            email: string | null;
            phone: string | null;
            website: string | null;
            address: string | null;
        };
        services: string[];
        createdAt: string | Date;
        updatedAt: string | Date;
        sections?: unknown;
        themeConfig?: unknown;
    }>;
    user: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        isApproved: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        id: string;
        email: string;
        isApproved: boolean;
    }, {
        id: string;
        email: string;
        isApproved: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    profile: {
        id: string;
        status: "APPROVED" | "PENDING_REVIEW" | "DRAFT" | "SUSPENDED";
        slug: string;
        displayName: string;
        headline: string | null;
        summary: string | null;
        mode: "CARD" | "BROCHURE";
        sections: Record<string, unknown>;
        metrics: {
            views30d: number;
            enquiries30d: number;
        };
        themeId: string | null;
        themeConfig: Record<string, unknown>;
        contact: {
            email: string | null;
            phone: string | null;
            website: string | null;
            address: string | null;
        };
        services: string[];
        createdAt: string | Date;
        updatedAt: string | Date;
    };
    user: {
        id: string;
        email: string;
        isApproved: boolean;
    };
}, {
    profile: {
        id: string;
        status: "APPROVED" | "PENDING_REVIEW" | "DRAFT" | "SUSPENDED";
        slug: string;
        displayName: string;
        headline: string | null;
        summary: string | null;
        mode: "CARD" | "BROCHURE";
        metrics: {
            views30d: number;
            enquiries30d: number;
        };
        themeId: string | null;
        contact: {
            email: string | null;
            phone: string | null;
            website: string | null;
            address: string | null;
        };
        services: string[];
        createdAt: string | Date;
        updatedAt: string | Date;
        sections?: unknown;
        themeConfig?: unknown;
    };
    user: {
        id: string;
        email: string;
        isApproved: boolean;
    };
}>;
type DashboardProfile = z.infer<typeof dashboardProfileSchema>;
type DashboardProfileResponse = z.infer<typeof dashboardProfileResponseSchema>;
type ThemeSummary = z.infer<typeof themeSchema>;

declare const adminCategorySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    isActive: z.ZodBoolean;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
}, {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
}>;
declare const adminCategoriesResponseSchema: z.ZodObject<{
    categories: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        isActive: z.ZodBoolean;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        slug: string;
        name: string;
        description: string | null;
        createdAt: string;
        updatedAt: string;
        isActive: boolean;
    }, {
        id: string;
        slug: string;
        name: string;
        description: string | null;
        createdAt: string;
        updatedAt: string;
        isActive: boolean;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    categories: {
        id: string;
        slug: string;
        name: string;
        description: string | null;
        createdAt: string;
        updatedAt: string;
        isActive: boolean;
    }[];
}, {
    categories: {
        id: string;
        slug: string;
        name: string;
        description: string | null;
        createdAt: string;
        updatedAt: string;
        isActive: boolean;
    }[];
}>;
type AdminCategory = z.infer<typeof adminCategorySchema>;
type AdminCategoriesResponse = z.infer<typeof adminCategoriesResponseSchema>;

declare const profileStatusSchema: z.ZodEnum<["DRAFT", "PENDING_REVIEW", "APPROVED", "SUSPENDED"]>;
declare const adminProfileSchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    displayName: z.ZodString;
    headline: z.ZodNullable<z.ZodString>;
    summary: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<["DRAFT", "PENDING_REVIEW", "APPROVED", "SUSPENDED"]>;
    mode: z.ZodEnum<["CARD", "BROCHURE"]>;
    categoryId: z.ZodNullable<z.ZodString>;
    categoryName: z.ZodNullable<z.ZodString>;
    user: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        phone: z.ZodNullable<z.ZodString>;
        isApproved: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        id: string;
        email: string;
        phone: string | null;
        isApproved: boolean;
    }, {
        id: string;
        email: string;
        phone: string | null;
        isApproved: boolean;
    }>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "APPROVED" | "PENDING_REVIEW" | "DRAFT" | "SUSPENDED";
    slug: string;
    displayName: string;
    headline: string | null;
    summary: string | null;
    mode: "CARD" | "BROCHURE";
    createdAt: Date;
    updatedAt: Date;
    user: {
        id: string;
        email: string;
        phone: string | null;
        isApproved: boolean;
    };
    categoryId: string | null;
    categoryName: string | null;
}, {
    id: string;
    status: "APPROVED" | "PENDING_REVIEW" | "DRAFT" | "SUSPENDED";
    slug: string;
    displayName: string;
    headline: string | null;
    summary: string | null;
    mode: "CARD" | "BROCHURE";
    createdAt: Date;
    updatedAt: Date;
    user: {
        id: string;
        email: string;
        phone: string | null;
        isApproved: boolean;
    };
    categoryId: string | null;
    categoryName: string | null;
}>;
declare const adminProfilesResponseSchema: z.ZodObject<{
    profiles: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        displayName: z.ZodString;
        headline: z.ZodNullable<z.ZodString>;
        summary: z.ZodNullable<z.ZodString>;
        status: z.ZodEnum<["DRAFT", "PENDING_REVIEW", "APPROVED", "SUSPENDED"]>;
        mode: z.ZodEnum<["CARD", "BROCHURE"]>;
        categoryId: z.ZodNullable<z.ZodString>;
        categoryName: z.ZodNullable<z.ZodString>;
        user: z.ZodObject<{
            id: z.ZodString;
            email: z.ZodString;
            phone: z.ZodNullable<z.ZodString>;
            isApproved: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            id: string;
            email: string;
            phone: string | null;
            isApproved: boolean;
        }, {
            id: string;
            email: string;
            phone: string | null;
            isApproved: boolean;
        }>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: "APPROVED" | "PENDING_REVIEW" | "DRAFT" | "SUSPENDED";
        slug: string;
        displayName: string;
        headline: string | null;
        summary: string | null;
        mode: "CARD" | "BROCHURE";
        createdAt: Date;
        updatedAt: Date;
        user: {
            id: string;
            email: string;
            phone: string | null;
            isApproved: boolean;
        };
        categoryId: string | null;
        categoryName: string | null;
    }, {
        id: string;
        status: "APPROVED" | "PENDING_REVIEW" | "DRAFT" | "SUSPENDED";
        slug: string;
        displayName: string;
        headline: string | null;
        summary: string | null;
        mode: "CARD" | "BROCHURE";
        createdAt: Date;
        updatedAt: Date;
        user: {
            id: string;
            email: string;
            phone: string | null;
            isApproved: boolean;
        };
        categoryId: string | null;
        categoryName: string | null;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    profiles: {
        id: string;
        status: "APPROVED" | "PENDING_REVIEW" | "DRAFT" | "SUSPENDED";
        slug: string;
        displayName: string;
        headline: string | null;
        summary: string | null;
        mode: "CARD" | "BROCHURE";
        createdAt: Date;
        updatedAt: Date;
        user: {
            id: string;
            email: string;
            phone: string | null;
            isApproved: boolean;
        };
        categoryId: string | null;
        categoryName: string | null;
    }[];
}, {
    profiles: {
        id: string;
        status: "APPROVED" | "PENDING_REVIEW" | "DRAFT" | "SUSPENDED";
        slug: string;
        displayName: string;
        headline: string | null;
        summary: string | null;
        mode: "CARD" | "BROCHURE";
        createdAt: Date;
        updatedAt: Date;
        user: {
            id: string;
            email: string;
            phone: string | null;
            isApproved: boolean;
        };
        categoryId: string | null;
        categoryName: string | null;
    }[];
}>;
declare const approveProfileSchema: z.ZodObject<{
    approve: z.ZodBoolean;
    reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    approve: boolean;
    reason?: string | undefined;
}, {
    approve: boolean;
    reason?: string | undefined;
}>;
type AdminProfile = z.infer<typeof adminProfileSchema>;
type AdminProfilesResponse = z.infer<typeof adminProfilesResponseSchema>;
type ApproveProfile = z.infer<typeof approveProfileSchema>;

export { type ActivityItem, type AdminCategoriesResponse, type AdminCategory, type AdminProfile, type AdminProfilesResponse, type ApproveProfile, type Category, type CategoryList, type DashboardProfile, type DashboardProfileResponse, type HealthCheck, type MetricCard, type PendingProfileCard, type ProfileInput, type ProfileSectionInput, type QuickAction, type SignalItem, type SignupRow, type SiteMode, type SuperAdminDashboard, type ThemeResponse, type ThemeSummary, type ThemesResponse, activityItemSchema, adminCategoriesResponseSchema, adminCategorySchema, adminProfileSchema, adminProfilesResponseSchema, approveProfileSchema, categoriesResponseSchema, categorySchema, dashboardProfileResponseSchema, dashboardProfileSchema, healthCheckSchema, metricCardSchema, pendingProfileCardSchema, profileSchema, profileSectionSchema, profileStatusSchema, quickActionSchema, signalItemSchema, signupRowSchema, siteModeSchema, superAdminDashboardSchema, themeConfigSchema, themeSchema, themesResponseSchema };
