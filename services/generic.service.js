import { genericSchema } from "../schema/Generic.schema.js";
import {
  addGenericsDB,
  getGenericByIdDB,
  getGenericsPaginatedDB,
} from "../models/generic.model.js";

export const addNewGenericService = async (data) => {
  const parsed = genericSchema.safeParse(data);

  if (!parsed.success) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.details = parsed.error.flatten();
    throw error;
  }

  const { data: responseData, error } = await addGenericsDB(parsed.data);

  if (error) {
    const err = new Error(error.message || "Failed to add generic");
    err.statusCode = 500;
    throw err;
  }

  return {
    message: "Generic added successfully",
    generic: responseData,
  };
};

export const getGenericByIdService = async (id) => {
  if (!id) {
    const error = new Error("Generic ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const { data, error } = await getGenericByIdDB(id);

  if (error) {
    const err = new Error("Generic not found.");
    err.statusCode = 404;
    throw err;
  }
  return data;
};

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
