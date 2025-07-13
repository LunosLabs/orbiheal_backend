import {addFormsDB} from "../models/form.model.js";
import {formSchema} from "../schema/Form.schema.js";


export const addNewFormService = async (data) => {
    const parsed = formSchema.safeParse(data);

    if(!parsed.success){
        const error = new Error("Validation failed");
        error.statusCode = 400;
        error.details = parsed.error.flatten();
        throw error;
    }

    const {data: responseData, error} = await addFormsDB(parsed.data);

    if(error){
        const err = new Error(error.message || "Failed to add form data");
        error.statusCode = 400;
        throw error;
    }

    return {
        message: "Form added successfully",
        data: responseData,
    }
}