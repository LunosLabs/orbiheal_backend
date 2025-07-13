import { supabaseAdmin } from "../config/supabaseClient.js";

//@post method adds new medicine
export const addMedicineDB = async (medicineData) => {
  return supabaseAdmin.rpc("add_medicine", medicineData);
};


//@get method fetches all medicine data
export const getMedicineByIdDB = async (med_id) => {
  return supabaseAdmin
      .rpc("get_medicine_by_id", { med_id })
}

export async function searchMedicinesDB(query) {
  return supabaseAdmin
      .from('medicine_search_view')
      .select(`
      id,
      brand_name,
      generic_name,
      manufacturer_name,
      form_name,
      strength,
      min_price,
      max_price,
      regulatory_status
    `)
      .or(`brand_name.ilike.${query}%,generic_name.ilike.${query}%`)
      .limit(10);
}


// Update medicines table
export const updateMedicineTableDB = async (id, medicine) => {
  return supabaseAdmin
      .from("medicines")
      .update(medicine)
      .eq("id", id);
}

// Update generics table
export const updateGenericTableDB = async (id, generic) => {
  return supabaseAdmin
      .from("generics")
      .update(generic)
      .eq("id", id);
}

// Update manufacturers table
export const updateManufacturerTableDB = async (id, manufacturer) => {
  return supabaseAdmin
      .from("manufacturers")
      .update(manufacturer)
      .eq("id", id);
}


export const getMedicinePaginatedDB = async (offset, limit) => {
  return supabaseAdmin
      .from('medicine_search_view')
      .select(`
      id,
      brand_name,
      generic_name,
      manufacturer_name,
      form_name,
      strength,
      min_price,
      max_price,
      regulatory_status
    `, { count: "exact" })
      .range(offset, offset + limit - 1);
}