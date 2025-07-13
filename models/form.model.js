import {supabaseAdmin} from "../config/supabaseClient.js";

//@post form data in the form tables
export const addFormsDB = async (formData) => {
    return supabaseAdmin
        .from("forms")
        .insert(formData)
        .select()
        .single();
}

export const getFormsPaginatedDB = async (offset, limit) => {
    return supabaseAdmin
        .from("forms")
        .select('id, name, route_of_administration, ease_of_use',
        { count: "exact" })
        .range(offset, offset + limit - 1);
}

export const getFormByIdDB = async (id) => {
    return supabaseAdmin
        .from("forms")
        .select("*")
        .eq("id", id)
        .single();
}