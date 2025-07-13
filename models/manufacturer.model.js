import { supabaseAdmin } from "../config/supabaseClient.js";

//@-post insert manufacturer data in manufacturer table
export const addManufacturerDB = async (manufacturerData) => {
  return supabaseAdmin
    .from("manufacturers")
    .insert([manufacturerData])
    .select()
    .single();
};

//@-patch update manufacturer data
export const updateManufacturerDB = async (id, updatedFields) => {
  return supabaseAdmin
    .from("manufacturers")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();
};

//@-delete manufacturer data
export const deleteManufacturerDB = async (id) => {
  return supabaseAdmin.from("manufacturers").delete().eq("id", id);
};

// @-get single manufacturer data
export const getManufacturerByIdDB = async (id) => {
  return supabaseAdmin.
  from("manufacturers")
      .select("*").eq("id", id).single();
};

// @-get paginated list
export const getManufacturersPaginatedDB = async (offset, limit) => {
  return supabaseAdmin
    .from("manufacturers")
    .select("id, name", { count: "exact" })
    .range(offset, offset + limit - 1);
};


