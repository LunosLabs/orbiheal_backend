import {supabaseAdmin} from "../config/supabaseClient.js";

// @post -> Inserts a new form record
export const addFormsDB = async (formData) => {
    return supabaseAdmin
        .from("forms")
        .insert([formData])
        .select("id")
        .single();
}

// @patch -> Updates an existing form by ID and sets update
export async function updateFormsDB(id, updatedFields) {
    return supabaseAdmin
        .from("forms")
        .update(updatedFields)
        .eq("id", id)
        .select("*")
        .single();
}

// @delete -> Deletes a form by ID
export async function deleteFormsDB(id) {
    return supabaseAdmin
        .from("forms")
        .delete()
        .eq("id", id);
}


// @get -> Retrieves a single form by ID
export const getFormByIdDB = async (id) => {
    return supabaseAdmin
        .from("forms")
        .select("name, route_of_administration, ease_of_use, suitability, accessibility_tips, user_friendly_summary")
        .eq("id", id)
        .single();
}

// @get -> Retrieves a paginated list of forms (with count)
export const getFormsPaginatedDB = async (offset, limit) => {
    return supabaseAdmin
        .from("forms")
        .select('id, name, route_of_administration, ease_of_use',
            { count: "exact" })
        .range(offset, offset + limit - 1);
}