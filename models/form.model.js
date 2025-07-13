import {supabaseAdmin} from "../config/supabaseClient.js";

//@post form data in the form tables
export const addFormsDB = async (formData) => {
    return supabaseAdmin
        .from("forms")
        .insert(formData)
        .select()
        .single();
}