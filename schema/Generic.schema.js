import {z} from "zod"

export const genericSchema = z.object({
    name: z.string()
        .min(3, "Generic name must be at least 3 characters long.")
        .trim()
        .transform(str => str.toLowerCase()),

    category: z.string()
        .min(3, "Generic category must be at least 3 characters long.")
        .trim()
        .transform(str => str.toLowerCase()),

    description: z.string()
        .min(3, "Generic description must be at least 3 characters long.")
        .trim()
        .transform(str => str.toLowerCase()),

    is_active: z.boolean().optional().default(true)
});

