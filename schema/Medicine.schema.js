import { z } from "zod";

// Enums
const regulatoryStatusEnum = [
    'otc',
    'prescription',
    'fda_approved',
    'ema_approved',
    'under_review',
    'not_approved',
    'other',
];

const ageGroupEnum = [
    'infant',
    'child',
    'adolescent',
    'adult',
    'elderly',
    'disabled',
];

// Transforms
const trimAndLower = (val) => val.trim().toLowerCase();

const attributeContentField = z
    .string()
    .min(1, 'Cannot be empty')
    .transform(trimAndLower)
    .optional();

// Main Medicine Schema
export const medicineSchema = z.object({
    brand_name: z.string()
        .min(1, 'Brand name is required')
        .transform(trimAndLower),

    generic_name: z.string()
        .min(1, 'Generic name is required')
        .transform(trimAndLower),

    manufacturer_name: z.string()
        .min(1, 'Manufacturer name is required')
        .transform(trimAndLower),

    form_name: z.string()
        .min(1, 'Form name is required')
        .transform(trimAndLower),

    strength: z.string()
        .min(1, 'Strength is required')
        .transform(trimAndLower),

    regulatory_status: z.enum(regulatoryStatusEnum, {
        errorMap: () => ({ message: 'Invalid regulatory status' }),
    }),

    age_group_suitability: z.array(z.enum(ageGroupEnum)).default([]),

    min_price: z.number().nonnegative('min_price cannot be negative'),
    max_price: z.number().nonnegative('max_price cannot be negative'),

    indication: z.string()
        .min(1, 'Indication is required')
        .transform(trimAndLower),

    dosage_instructions: z.string()
        .min(1, 'Dosage instructions are required')
        .transform(trimAndLower),

    onset_of_action: z.string()
        .min(1, 'Onset of action is required')
        .transform(trimAndLower),

    duration_of_effect: z.string()
        .min(1, 'Duration of effect is required')
        .transform(trimAndLower),

    // Attribute fields
    precautions: attributeContentField,
    contraindications: attributeContentField,
    warnings: attributeContentField,
    side_effects_common: attributeContentField,
    side_effects_serious: attributeContentField,
    pro_tips: attributeContentField,
    pregnancy: attributeContentField,
});

//
// Schema to PATCH/UPDATE medicine
//
export const updateMedicineSubSchema = z.object({
    brand_name: z.string().min(1).transform(trimAndLower).optional(),
    generic_name: z.string().min(1).transform(trimAndLower).optional(),
    is_verified: z.literal(false, {
        errorMap: () => ({ message: 'is_verified must be false' }),
    }),
    manufacturer_name: z.string().min(1).transform(trimAndLower).optional(),
    form_name: z.string().min(1).transform(trimAndLower).optional(),
    strength: z.string().min(1).transform(trimAndLower).optional(),

    regulatory_status: z.enum(regulatoryStatusEnum).optional(),
    age_group_suitability: z.array(z.enum(ageGroupEnum)).optional(),

    min_price: z.number().nonnegative().optional(),
    max_price: z.number().nonnegative().optional(),

    indication: z.string().min(1).transform(trimAndLower).optional(),
    dosage_instructions: z.string().min(1).transform(trimAndLower).optional(),
    onset_of_action: z.string().min(1).transform(trimAndLower).optional(),
    duration_of_effect: z.string().min(1).transform(trimAndLower).optional(),

    precautions: attributeContentField,
    contraindications: attributeContentField,
    warnings: attributeContentField,
    side_effects_common: attributeContentField,
    side_effects_serious: attributeContentField,
    pro_tips: attributeContentField,
    pregnancy: attributeContentField,
}).strict().optional();

//
// Search schema for querying medicines
//
export const searchMedicinesSchema = z.object({
    query: z.string()
        .min(1, "Query is required")
        .transform(str => str.trim().toLowerCase())
});
