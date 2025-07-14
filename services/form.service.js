import {
  addFormsDB, deleteFormsDB,
  getFormByIdDB,
  getFormsPaginatedDB, updateFormsDB,
} from "../models/form.model.js";
import {formPartialSchema, formSchema} from "../schema/Add.data.schema.js";

// @post -> Adds a new form after validation
export const addNewFormService = async (newData) => {
  const parsed = formSchema.safeParse(newData);

  if (!parsed.success) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.details = parsed.error.flatten();
    throw error;
  }

  const { data, error } = await addFormsDB(parsed.data);

  if (error) {
    const err = new Error(error.message || "Failed to add form data");
    error.statusCode = 400;
    throw error;
  }

  return {
    message: "Form added successfully",
    data: data.id,
  };
};


// @patch -> Updates a form by ID with partial validation
export async function updateFormService(id, newData) {
  if (!id) {
    const error = new Error("Form ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const parsed = formPartialSchema.safeParse(newData);
  if (!parsed.success) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.details = parsed.error.flatten();
    throw error;
  }

  const { data, error } = await updateFormsDB(id, parsed.data);
  if (error) {
    const err = new Error(error.message || "Failed to update manufacturer");
    err.statusCode = 500;
    throw err;
  }

  return {
    message: "Forms updated successfully",
    data: data
  };
}


// @delete -> Deletes a form by ID
export async function deleteFormService(id) {
  if (!id) {
    const error = new Error("Form ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const { error } = await deleteFormsDB(id);
  if (error) {
    const err = new Error(error.message || "Failed to delete form");
    err.statusCode = 500;
    throw err;
  }

  return {
    message: "Form deleted successfully",
  };
}


// @get -> Retrieves a single form by ID
export const getFormsByIdService = async (id) => {
  if (!id) {
    const error = new Error("Form ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const { data, error } = await getFormByIdDB(id);

  if (error || !data) {
    const err = new Error("Forms not found.");
    err.statusCode = 404;
    throw err;
  }
  return data;
};


// @get -> Retrieves a paginated list of forms
export const getFormsPaginatedService = async (page, limit) => {
  if (page < 1 || limit < 1) {
    const error = new Error("Invalid page or limit value.");
    error.statusCode = 400;
    throw error;
  }

  const offset = (page - 1) * limit;
  const { data, error, count } = await getFormsPaginatedDB(offset, limit);
  if (error) {
    const err = new Error(error.message || "Failed to fetch forms.");
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


