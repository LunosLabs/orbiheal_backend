import {getUserProfileDB} from "../models/user.model.js";

export const getUserByIdService = async (id) => {
    // Call data layer
    const { data, error } = await getUserProfileDB(id);
    if (error) {
        if (error.code === "PGRST116") {
            const err = new Error("User not found.");
            err.statusCode = 404;
            throw err;
        }

        // Other DB errors
        const err = new Error(error.message || "Database error.");
        err.statusCode = 500;
        throw err;
    }

    return data;
};
