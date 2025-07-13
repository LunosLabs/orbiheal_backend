import {medicineSchema, searchMedicinesSchema, updateMedicineRequestSchema} from "../schema/Medicine.schema.js";
import {
  addMedicineDB, getMedicineByIdDB,
  searchMedicinesDB, updateMedicineTableDB,
  updateGenericTableDB, updateManufacturerTableDB, getMedicinePaginatedDB,
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
  const { data: responseData, error } = await addMedicineDB(dbInput);

  console.log(error)

  if (error) {
    const err = new Error(error.message || "Failed to insert medicine");
    err.statusCode = 400;
    throw err;
  }

  return {
    message: "Medicine inserted successfully",
    medicine_id: responseData,
  };
};


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


export const getMedicinesPaginatedService = async (page, limit) => {
  if (page < 1 || limit < 1) {
    const error = new Error("Invalid page or limit value.");
    error.statusCode = 400;
    throw error;
  }

  const offset = (page - 1) * limit;
  const {data, error, count} = await getMedicinePaginatedDB(offset, limit);

  if (error) {
    const err = new Error(error.message || "Failed to fetch medicines.");
    err.statusCode = 500;
    throw err;
  }

  return{
    page,
    limit,
    total: count,
    totalPages: Math.ceil(count / limit),
    medicines: data,
  }
}


export const updateMedicineByIdService = async (id, rawData) => {

  if (!id || typeof id !== 'string' || id.trim() === '') {
    const err = new Error("Invalid medicine ID.");
    err.statusCode = 400;
    throw err;
  }

  const parsed = updateMedicineRequestSchema.safeParse(rawData);
  if (!parsed.success) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.details = parsed.error.flatten();
    throw error;
  }

  console.log(parsed.data)
  const { medicine, generic, manufacturer } = parsed.data;

  console.log(parsed.data);

  // if (
  //     (!medicine || Object.keys(medicine).length === 0) &&
  //     (!generic || Object.keys(generic).length === 0) &&
  //     (!manufacturer || Object.keys(manufacturer).length === 0)
  // ) {
  //   const error = new Error("No valid update data provided");
  //   error.statusCode = 400;
  //   throw error;
  // }
  //
  // // Get related IDs
  // const { data: record, error: fetchError } = await getMedicineRecordByIdDB(id);
  //
  // console.log(fetchError)
  // if (fetchError || !record) {
  //   const error = new Error("Medicine not found");
  //   error.statusCode = 404;
  //   throw error;
  // }
  //
  //
  //
  // const updatePromises = [];
  //
  // return res.status(200).json({
  //   record
  // })

  // if (medicine && Object.keys(medicine).length) {
  //   updatePromises.push(updateMedicineTableDB(id, medicine));
  // }
  //
  // if (generic && Object.keys(generic).length) {
  //   updatePromises.push(updateGenericTableDB(record.generic_id, generic));
  // }
  //
  // if (manufacturer && Object.keys(manufacturer).length) {
  //   updatePromises.push(updateManufacturerTableDB(record.manufacturer_id, manufacturer));
  // }
  //
  // const results = await Promise.all(updatePromises);
  // const failed = results.find((r) => r.error);
  // if (failed) {
  //   const error = new Error(failed.error.message || "Failed to update");
  //   error.statusCode = 500;
  //   throw error;
  // }
  //
  // return {
  //   message: "Medicine updated successfully",
  //   medicine_id: id,
  // };
};
