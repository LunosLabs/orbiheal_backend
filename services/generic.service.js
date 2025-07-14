import {
  genericsSchema,
  genericsPartialSchema
} from "../schema/Add.data.schema.js";
import {
  addGenericsDB,
    deleteGenericsByIdDB,
    getGenericsByIdDB,
    getGenericsPaginatedDB,
    updateGenericsDB
} from "../models/generic.model.js";

// @post -> Adds a new generic after validation
export const addNewGenericService = async (newData) => {
  const parsed = genericsSchema.safeParse(newData);

  if (!parsed.success) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.details = parsed.error.flatten();
    throw error;
  }

  const { data, error } = await addGenericsDB(parsed.data);

  if (error) {
    const err = new Error(error.message || "Failed to add generic");
    err.statusCode = 500;
    throw err;
  }

  return {
    message: "Generic added successfully",
    id: data.id
  };
};


// @patch -> Updates a generic by ID with partial validation
export async function updateGenericService(id, newData) {
  if (!id) {
    const error = new Error("Manufacturer ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const parsed = genericsPartialSchema.safeParse(newData);
  if (!parsed.success) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.details = parsed.error.flatten();
    throw error;
  }

  const { data, error } = await updateGenericsDB(id, parsed.data);
  if (error) {
    const err = new Error(error.message || "Failed to update generics");
    err.statusCode = 500;
    throw err;
  }

  return {
    message: "Generics updated successfully",
    data: data
  };
}

// @delete -> Deletes a manufacturer by ID
export async function deleteGenericService(id) {
  if (!id) {
    const error = new Error("Manufacturer ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const { error } = await deleteGenericsByIdDB(id);
  if (error) {
    const err = new Error(error.message || "Failed to delete generics");
    err.statusCode = 500;
    throw err;
  }

  return {
    message: "Generics deleted successfully",
  };
}

// @get -> Retrieves a single generic by ID
export const getGenericByIdService = async (id) => {
  if (!id) {
    const error = new Error("Generic ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const { data, error } = await getGenericsByIdDB(id);

  if (error) {
    const err = new Error("Generic not found.");
    err.statusCode = 404;
    throw err;
  }

  return data;
};

// @get -> Retrieves a paginated list of generics
export const getGenericsPaginatedService = async (page, limit) => {
  if (page < 1 || limit < 1) {
    const error = new Error("Invalid page or limit value.");
    error.statusCode = 400;
    throw error;
  }

  const offset = (page - 1) * limit;
  const { data, error, count } = await getGenericsPaginatedDB(offset, limit);

  if (error) {
    const err = new Error(error.message || "Failed to fetch Generics");
    err.statusCode = 500;
    throw err;
  }

  return {
    page,
    limit,
    total: count,
    totalPages: Math.ceil(count / limit),
    generics: data,
  };
};
