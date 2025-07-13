import {
  addNewMedicineService,
  getMedicineByIdService,
  searchMedicinesService,
  updateMedicineByIdService,
} from "../services/medicine.service.js";

//add new medicine controller
export const addNewMedicineController = async (req, res, next) => {
  try {
    const result = await addNewMedicineService(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

//search medicine by generic or brand name
export const searchMedicineController = async (req, res, next) => {
  try {
    const result = await searchMedicinesService(req.query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//
export const updateMedicineController = async (req, res, next) => {
  try {
    const result = await updateMedicineByIdService(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getMedicineByIdController = async (req, res, next) => {
  try {
    const result = await getMedicineByIdService(req.params.id);
    res.status(200).json({
      message: "Medicine fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
