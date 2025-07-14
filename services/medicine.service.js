import {medicineSchema, searchMedicinesSchema} from "../schema/Medicine.schema.js";
import {
  addMedicineDB, getMedicineByIdDashboradDB, getMedicineByIdDB, getMedicinePaginatedDB, searchMedicinesDB
} from "../models/medicine.model.js";
import {addPrefixToKeys} from "../utils/medicine.transform.js";



export const addNewMedicineService = async (rawData) => {
  const parsed = medicineSchema.safeParse(rawData);

  if (!parsed.success) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.details = parsed.error.flatten();
    throw error;
  }

  const dbInput = addPrefixToKeys(parsed.data);

  // Call DB function
  const { data, error } = await addMedicineDB(dbInput);

  if (error) {
    const err = new Error(error.message || "Failed to insert medicine");
    err.statusCode = 400;
    throw err;
  }

  return {
    message: "Medicine inserted successfully",
    data,
  };
}


export const searchMedicinesService = async (data) => {
  const parsed = searchMedicinesSchema.safeParse(data)

  if(!parsed.success){
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.details = parsed.error.flatten();
    throw error;
  }

  const { data: responseData, error } = await searchMedicinesDB(parsed.data.query);

  if (error) {
    const err = new Error(error.message || "Failed to search medicines");
    err.statusCode = 400;
    throw err;
  }
  return {
    message: "Medicines searched successfully",
    medicines: responseData,
  }
}


export const getMedicineByIdService = async (id) => {

  if (!id || typeof id !== 'string' || id.trim() === '') {
    const err = new Error("Invalid medicine ID.");
    err.statusCode = 400;
    throw err;
  }

  const { data, error } = await getMedicineByIdDashboradDB(id);

  if (error) {
    const err = new Error(error.message || "Database error.");
    err.statusCode = 500;
    throw err;
  }

  if (!data) {
    const err = new Error("Medicine not found.");
    err.statusCode = 404;
    throw err;
  }

  return data;
};


export const getMedicinePaginatedService = async (page, limit) => {
  if (page < 1 || limit < 1) {
    const error = new Error("Invalid page or limit value.");
    error.statusCode = 400;
    throw error;
  }

  const offset = (page - 1) * limit;
  const { data, error, count } = await getMedicinePaginatedDB(offset, limit);
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
    medicine: data,
  };
};


export const getMedicineByIdAdminService = async (id) => {

  if (!id || typeof id !== 'string' || id.trim() === '') {
    const err = new Error("Invalid medicine ID.");
    err.statusCode = 400;
    throw err;
  }

  const { data, error } = await getMedicineByIdDB(id);

  if (error) {
    const err = new Error(error.message || "Database error.");
    err.statusCode = 500;
    throw err;
  }

  if (!data) {
    const err = new Error("Medicine not found.");
    err.statusCode = 404;
    throw err;
  }

  return data;
};