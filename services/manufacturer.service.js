import {
  manufacturerPartialSchema,
  manufacturerSchema,
} from "../schema/Manufacture.schema.js";
import {
  addManufacturerDB,
  deleteManufacturerDB,
  getManufacturerByIdDB,
  getManufacturersPaginatedDB,
  updateManufacturerDB,
} from "../models/manufacturer.model.js";

export const addNewManufacturerService = async (data) => {
  const parsed = manufacturerSchema.safeParse(data);

  if (!parsed.success) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.details = parsed.error.flatten();
    throw error;
  }

  const { data: responseData, error } = await addManufacturerDB(parsed.data);

  if (error) {
    const err = new Error(error.message || "Failed to add manufacturer");
    err.statusCode = 500;
    throw err;
  }

  return {
    message: "Manufacturer added successfully",
    manufacturer: responseData,
  };
};

export const updateManufacturerService = async (id, data) => {
  if (!id) {
    const error = new Error("Manufacturer ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const parsed = manufacturerPartialSchema.safeParse(data);

  if (!parsed.success) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.details = parsed.error.flatten();
    throw error;
  }

  const { data: updatedData, error } = await updateManufacturerDB(
    id,
    parsed.data
  );

  if (error) {
    const err = new Error(error.message || "Failed to add manufacturer");
    err.statusCode = 500;
    throw err;
  }

  return {
    message: "Manufacturer updated successfully",
    manufacturer: updatedData,
  };
};

export const deleteManufacturerService = async (id) => {
  if (!id) {
    const error = new Error("Manufacturer ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const { error } = await deleteManufacturerDB(id);
  if (error) {
    const err = new Error(error.message || "Failed to delete manufacturer.");
    err.statusCode = 500;
    throw err;
  }

  return {
    message: "Manufacturer delete successfully",
  };
};

// Get by ID service
export const getManufacturerByIdService = async (id) => {
  if (!id) {
    const error = new Error("Manufacturer ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const { data, error } = await getManufacturerByIdDB(id);

  if (error) {
    const err = new Error("Manufacturer not found.");
    err.statusCode = 404;
    throw err;
  }
  return data;
};

export const getManufacturersPaginatedService = async (page, limit) => {
  if (page < 1 || limit < 1) {
    const error = new Error("Invalid page or limit value.");
    error.statusCode = 400;
    throw error;
  }

  const offset = (page - 1) * limit;
  const { data, error, count } = await getManufacturersPaginatedDB(
    offset,
    limit
  );

  if (error) {
    const err = new Error(error.message || "Failed to fetch manufacturers.");
    err.statusCode = 500;
    throw err;
  }

  return {
    page,
    limit,
    total: count,
    totalPages: Math.ceil(count / limit),
    manufacturers: data,
  };
};
