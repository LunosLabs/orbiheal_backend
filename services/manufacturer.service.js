import {
  manufacturerSchema,
  manufacturerPartialSchema
} from "../schema/Add.data.schema.js";

import {
  addManufacturerDB,
  deleteManufacturerDB,
  getManufacturerByIdDB,
  getManufacturersPaginatedDB,
  updateManufacturerDB,
} from "../models/manufacturer.model.js";

// @post -> Adds a new manufacturer after validation
export async function addNewManufacturerService(newData) {
  const parsed = manufacturerSchema.safeParse(newData);
  if (!parsed.success) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.details = parsed.error.flatten();
    throw error;
  }

  const { data, error } = await addManufacturerDB(parsed.data);
  if (error) {
    const err = new Error(error.message || "Failed to add manufacturer");
    err.statusCode = 500;
    throw err;
  }

  return {
    message: "Manufacturer added successfully",
    id: data.id,
  };
}


// @patch -> Updates a manufacturer by ID with partial validation
export async function updateManufacturerService(id, newData) {
  if (!id) {
    const error = new Error("Manufacturer ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const parsed = manufacturerPartialSchema.safeParse(newData);
  if (!parsed.success) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.details = parsed.error.flatten();
    throw error;
  }

  const { data, error } = await updateManufacturerDB(id, parsed.data);
  if (error) {
    const err = new Error(error.message || "Failed to update manufacturer");
    err.statusCode = 500;
    throw err;
  }

  return {
    message: "Manufacturer updated successfully",
    data: data
  };
}


// @delete -> Deletes a manufacturer by ID
export async function deleteManufacturerService(id) {
  if (!id) {
    const error = new Error("Manufacturer ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const { error } = await deleteManufacturerDB(id);
  if (error) {
    const err = new Error(error.message || "Failed to delete manufacturer");
    err.statusCode = 500;
    throw err;
  }

  return {
    message: "Manufacturer deleted successfully",
  };
}


// @get -> Retrieves a single manufacturer by ID
export async function getManufacturerByIdService(id) {
  if (!id) {
    const error = new Error("Manufacturer ID is required.");
    error.statusCode = 400;
    throw error;
  }

  const { data, error } = await getManufacturerByIdDB(id);
  if (error || !data) {
    const err = new Error("Manufacturer not found.");
    err.statusCode = 404;
    throw err;
  }

  return data;
}


// @get -> Retrieves a paginated list of manufacturers
export async function getManufacturersPaginatedService(page, limit) {
  if (
      !Number.isInteger(page) ||
      page < 1 ||
      !Number.isInteger(limit) ||
      limit < 1
  ) {
    const error = new Error("Invalid page or limit value.");
    error.statusCode = 400;
    throw error;
  }

  const offset = (page - 1) * limit;
  const { data, error, count } = await getManufacturersPaginatedDB(offset, limit);

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
}
