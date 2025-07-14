import { supabaseAdmin } from "../config/supabaseClient.js";

// @post -> Inserts a new manufacturer record
export async function addManufacturerDB(manufacturerData) {
  return supabaseAdmin
      .from("manufacturers")
      .insert([manufacturerData])
      .select("id")
      .single();
}

// @patch -> Updates an existing manufacturer by ID and sets updated_at timestamp
export async function updateManufacturerDB(id, updatedFields) {
  updatedFields.updated_at = new Date().toISOString();

  return supabaseAdmin
      .from("manufacturers")
      .update(updatedFields)
      .eq("id", id)
      .select("*")
      .single();
}

// @delete -> Deletes a manufacturer by ID
export async function deleteManufacturerDB(id) {
  return supabaseAdmin
      .from("manufacturers")
      .delete()
      .eq("id", id);
}

// @get -> Retrieves a single manufacturer by ID
export async function getManufacturerByIdDB(id) {
  return supabaseAdmin
      .from("manufacturers")
      .select("name, country, website_url, description")
      .eq("id", id)
      .single();
}

// @get -> Retrieves a paginated list of manufacturers (with count)
export async function getManufacturersPaginatedDB(offset, limit) {
  return supabaseAdmin
      .from("manufacturers")
      .select("id, name, country, website_url", { count: "exact" })
      .range(offset, offset + limit - 1);
}
