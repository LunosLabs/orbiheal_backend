import {supabaseAdmin} from "../config/supabaseClient.js";

//@post generic data in the generics table
export const addGenericsDB = async (genericData) => {
    return supabaseAdmin
        .from("generics")
        .insert(genericData)
        .select()
        .single();
}