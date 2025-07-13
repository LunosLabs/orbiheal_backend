import {genericSchema} from "../schema/Generic.schema.js";
import {addGenericsDB} from "../models/generic.model.js";


export const addNewGenericService = async (data) => {
    const parsed = genericSchema.safeParse(data);

    if(!parsed.success){
        const error = new Error("Validation failed");
        error.statusCode = 400;
        error.details = parsed.error.flatten();
        throw error;
    }

    const {data: responseData, error} = await addGenericsDB(parsed.data);

    if(error){
        const err = new Error(error.message || "Failed to add generic");
        err.statusCode = 500;
        throw err;
    }

    return {
        message: "Generic added successfully",
        generic: responseData,
    }
}



