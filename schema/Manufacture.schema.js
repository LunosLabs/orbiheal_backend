import { z } from "zod";

export const manufacturerSchema = z.object({
    name: z.string().min(1, "Manufacturer name is required").transform(str => str.trim().toLowerCase()),
    description: z.string().transform(str => str?.trim().toLowerCase() || null),
    country: z.string().transform(str => str?.trim().toLowerCase() || null),
    website_url: z.string().optional().transform(str => str?.trim().toLowerCase() || null),
});

export const manufacturerPartialSchema = manufacturerSchema.partial();