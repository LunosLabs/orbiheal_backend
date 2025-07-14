import { supabaseAdmin } from "../config/supabaseClient.js";

// @post -> Inserts a new generic record
export const addGenericsDB = async (genericData) => {
  return supabaseAdmin
    .from("generics")
    .insert([genericData])
    .select("id")
    .single();
};

// @patch -> Updates an existing generic by ID and sets updated_at timestamp
export async function updateGenericsDB(id, updatedFields) {
  updatedFields.updated_at = new Date().toISOString();

  return supabaseAdmin
    .from("generics")
    .update(updatedFields)
    .eq("id", id)
    .select("*")
    .single();
}

// @delete -> Deletes a generic by ID
export const deleteGenericsByIdDB = async (id) => {
  return supabaseAdmin
    .from("generics")
    .delete()
    .eq("id", id);
};

// @get -> Retrieves a single generic by ID
export async function getGenericsByIdDB(id) {
  return supabaseAdmin
    .from("generics")
    .select("name, category, description")
    .eq("id", id)
    .single();
}

// @get -> Retrieves a paginated list of generics (with count)
export const getGenericsPaginatedDB = async (offset, limit) => {
  return supabaseAdmin
    .from("generics")
    .select("id, name", { count: "exact" })
    .range(offset, offset + limit - 1);
};
