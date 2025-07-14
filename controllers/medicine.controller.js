import {
  addNewMedicineService, getMedicineByIdAdminService, getMedicineByIdService,
  getMedicinePaginatedService,
  searchMedicinesService
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


export const getMedicineByIdController = async (req, res, next) => {
  try {
    const result = await getMedicineByIdService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


export const getMedicinesPaginatedController = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const result = await getMedicinePaginatedService(page, limit)
    return res.status(200).json(result);
  } catch(error){
    next(error);
  }
}

export const getMedicineByIdAdminController = async (req, res, next) => {
  try {
    const result = await getMedicineByIdAdminService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};