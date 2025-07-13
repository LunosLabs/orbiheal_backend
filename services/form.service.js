import {
  addFormsDB,
  getFormByIdDB,
  getFormsPaginatedDB,
} from "../models/form.model.js";
import { formSchema } from "../schema/Form.schema.js";

export const addNewFormService = async (data) => {
  const parsed = formSchema.safeParse(data);

  if (!parsed.success) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.details = parsed.error.flatten();
    throw error;
  }

  const { data: responseData, error } = await addFormsDB(parsed.data);

  if (error) {
    const err = new Error(error.message || "Failed to add form data");
    error.statusCode = 400;
    throw error;
  }

  return {
    message: "Form added successfully",
    data: responseData,
  };
};

export const getFormsPaginatedService = async (page, limit) => {
  if (page < 1 || limit < 1) {
    const error = new Error("Invalid page or limit value.");
    error.statusCode = 400;
    throw error;
  }

  const offset = (page - 1) * limit;
  const { data, error, count } = await getFormsPaginatedDB(offset, limit);
  console.log(data);
  if (error) {
    const err = new Error(error.message || "Failed to fetch medicines.");
    err.statusCode = 500;
    throw err;
  }

  return {
    page,
    limit,
    total: count,
    totalPages: Math.ceil(count / limit),
    forms: data,
  };
};

export const getFormsByIdService = async (id) => {
  if (!id) {
    const error = new Error("Manufacturer ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const { data, error } = await getFormByIdDB(id);

  if (error) {
    const err = new Error("Forms not found.");
    err.statusCode = 404;
    throw err;
  }
  return data;
};
