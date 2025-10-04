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

export { type Category, type CategoryList, type ProfileInput, type ProfileSectionInput, type SiteMode, categoriesResponseSchema, categorySchema, profileSchema, profileSectionSchema, siteModeSchema };
