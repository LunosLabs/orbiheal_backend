import {supabaseAdmin} from "../config/supabaseClient.js";

//@get user profile method
export const getUserProfileDB = async (userId) => {
    return supabaseAdmin
        .from("users")
        .select("id, name, email, role")
        .eq("id", userId)
        .single();
}