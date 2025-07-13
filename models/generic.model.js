import {supabaseAdmin} from "../config/supabaseClient.js";

//@post generic data in the generics table
export const addGenericsDB = async (genericData) => {
    return supabaseAdmin
        .from("generics")
        .insert(genericData)
        .select()
        .single();
}


export const getGenericByIdDB = async (id) => {
    return supabaseAdmin
        .from("generics")
        .select('id, name, category, description, is_active')
        .eq('id', id)
        .single();
}

export const getGenericsPaginatedDB = async (offset, limit) => {
    return supabaseAdmin
        .from("generics")
        .select("id, name", { count: "exact" })
        .range(offset, offset + limit - 1);
};
