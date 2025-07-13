import { z } from "zod";


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

const lowerTrim = (val) => val.trim().toLowerCase();

const stringArraySchema = z
    .array(z.string().min(1, 'Array items cannot be empty').transform(lowerTrim))
    .min(1, 'Array must contain at least one item')
    .default([]);

// Schema to post new medicine
export const medicineSchema = z.object({
    brand_name: z.string().min(1, 'Brand name is required').transform(lowerTrim),
    generic_name: z.string().min(1, 'Generic name is required').transform(lowerTrim),
    is_verified: z.literal(false, { errorMap: () => ({ message: 'is_verified must be false' }) }),
    manufacturer_name: z.string().min(1, 'Manufacturer name is required').transform(lowerTrim),
    form_name: z.string().min(1, 'Form name is required').transform(lowerTrim),
    strength: z.string().min(1, 'Strength is required').transform(lowerTrim),
    regulatory_status: z.enum(regulatoryStatusEnum, {
        errorMap: () => ({ message: 'Invalid regulatory status' }),
    }),
    age_group_suitability: z.array(z.enum(ageGroupEnum)).default([]),
    min_price: z.number().nonnegative('min_price cannot be negative'),
    max_price: z.number().nonnegative('max_price cannot be negative'),
    indication: z.string().min(1, 'Indication is required').transform(lowerTrim),
    dosage_instructions: z.string().min(1, 'Dosage instructions are required').transform(lowerTrim),
    onset_of_action: z.string().min(1, 'Onset of action is required').transform(lowerTrim),
    duration_of_effect: z.string().min(1, 'Duration of effect is required').transform(lowerTrim),
    warnings: stringArraySchema,
    contraindications: stringArraySchema,
    interactions: stringArraySchema,
    side_effects_common: stringArraySchema,
    side_effects_serious: stringArraySchema,
    precautions: stringArraySchema,
    pro_tips: stringArraySchema,
});


//update


const stringArrayUpdateSchema= z.array(
    z.string().min(1).transform(lowerTrim)
).min(1).optional();

export const updateMedicineSubSchema = z.object({
    brand_name: z.string().min(1).transform(lowerTrim).optional(),
    is_verified: z.literal(false, { errorMap: () => ({ message: 'is_verified must be false' }) }),
    strength: z.string().min(1).transform(lowerTrim).optional(),
    regulatory_status: z.enum(regulatoryStatusEnum).optional(),
    age_group_suitability: z.array(z.enum(ageGroupEnum)).optional(),
    min_price: z.number().nonnegative().optional(),
    max_price: z.number().nonnegative().optional(),
    indication: z.string().min(1).transform(lowerTrim).optional(),
    dosage_instructions: z.string().min(1).transform(lowerTrim).optional(),
    onset_of_action: z.string().min(1).transform(lowerTrim).optional(),
    duration_of_effect: z.string().min(1).transform(lowerTrim).optional(),
    warnings: stringArrayUpdateSchema,
    contraindications: stringArrayUpdateSchema,
    interactions: stringArrayUpdateSchema,
    side_effects_common: stringArrayUpdateSchema,
    side_effects_serious: stringArrayUpdateSchema,
    precautions: stringArrayUpdateSchema,
    pro_tips: stringArrayUpdateSchema,
}).strict().optional();

export const updateGenericSchema = z.object({
    name: z.string().min(1).transform(lowerTrim)
}).strict().optional();

export const updateManufacturerSchema = z.object({
    name: z.string().min(1).transform(lowerTrim).optional(),
    website: z.string().url().optional()
}).strict().optional();

export const updateMedicineRequestSchema = z.object({
    medicine: updateMedicineSubSchema,
    generic: updateGenericSchema,
    manufacturer: updateManufacturerSchema,
}).strict();



// schema to search medicine
export const searchMedicinesSchema = z.object({
    query: z.string().min(1, "Query is required").transform(str => str.trim().toLowerCase())
});




