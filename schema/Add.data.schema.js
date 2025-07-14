import { z } from "zod";

// Manufacturer schema validator
export const manufacturerSchema = z.object({
    name: z.string()
        .min(1, "Manufacturer name is required")
        .transform(str => str.trim().toLowerCase()),

    description: z.string()
        .transform(str => str?.trim().toLowerCase() || null),

    country: z.string()
        .transform(str => str?.trim().toLowerCase() || null),

    website_url: z.string()
        .optional()
        .transform(str => str?.trim().toLowerCase() || null),
});

export const manufacturerPartialSchema = manufacturerSchema.partial();


// Generics schema validator
export const genericsSchema = z.object({
    name: z.string()
        .min(3, "Generic name must be at least 3 characters long.")
        .transform(str => str.trim().toLowerCase()),

    category: z.string()
        .min(3, "Generic category must be at least 3 characters long.")
        .transform(str => str.trim().toLowerCase() || null),

    description: z.string()
        .min(3, "Generic description must be at least 3 characters long.")
        .transform(str => str.trim().toLowerCase()),

    is_active: z.boolean().optional().default(true),
});

export const genericsPartialSchema = genericsSchema.partial();



// Form schema
const validRoutes = [
    "oral",
    "intravenous",
    "topical",
    "inhaled",
    "sublingual",
    "rectal",
    "transdermal",
    "nasal",
    "ocular",
    "other"
];

export const formSchema = z.object({
    name: z.string()
        .min(3, "Form name must be at least 3 characters long.")
        .transform(str => str.trim().toLowerCase()),

    route_of_administration: z.string()
        .transform(str => str.trim().toLowerCase())
        .refine(val => validRoutes.includes(val), { message: "Invalid route of administration." }),

    user_friendly_summary: z.string()
        .min(5, "User-friendly summary must be at least 5 characters long.")
        .transform(str => str.trim().toLowerCase()),

    ease_of_use: z.string()
        .optional()
        .transform(val => val?.trim().toLowerCase())
        .refine(
            val => !val || ["easy", "moderate", "difficult"].includes(val),
            { message: "Invalid ease of use." }
        ),

    suitability: z.array(
        z.string()
            .min(1, "Suitability items must not be empty.")
            .transform(str => str.trim().toLowerCase())
    ).optional(),

    accessibility_tips: z.array(
        z.string()
            .min(1, "Accessibility tips must not be empty.")
            .transform(str => str.trim().toLowerCase())
    ).optional(),
});

export const formPartialSchema = formSchema.partial();
