import { z } from "zod";

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
    name: z
        .string()
        .min(3, "Form name must be at least 3 characters long.")
        .trim()
        .transform(str => str.toLowerCase()),

    route_of_administration: z
        .string()
        .transform(str => str.trim().toLowerCase())
        .refine(
            val => validRoutes.includes(val),
            { message: "Invalid route of administration." }
        ),

    user_friendly_summary: z
        .string()
        .min(5, "User-friendly summary must be at least 5 characters long.")
        .trim()
        .transform(str => str.toLowerCase()),

    ease_of_use: z
        .string()
        .optional()
        .transform(val => val?.trim().toLowerCase())
        .refine(
            val => !val || ["easy", "moderate", "difficult"].includes(val),
            { message: "Invalid ease of use." }
        ),

    suitability: z
        .array(z.string().min(1).trim().transform(str => str.toLowerCase()))
        .optional(),

    accessibility_tips: z
        .array(z.string().min(1).trim().transform(str => str.toLowerCase()))
        .optional(),
});
