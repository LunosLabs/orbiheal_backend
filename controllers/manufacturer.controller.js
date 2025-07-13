// ✅🚀🎇

import {
  addNewManufacturerService,
  deleteManufacturerService,
  getManufacturerByIdService,
  getManufacturersPaginatedService,
  updateManufacturerService,
} from "../services/manufacturer.service.js";

export const addNewManufacturerController = async (req, res, next) => {
  try {
    const result = await addNewManufacturerService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateManufacturerController = async (req, res, next) => {
  try {
    const result = await updateManufacturerService(req.params.id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteManufacturerController = async (req, res, next) => {
  try {
    const result = await deleteManufacturerService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getManufacturerByIdController = async (req, res, next) => {
  try {
    const result = await getManufacturerByIdService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getManufacturersPaginatedController = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const result = await getManufacturersPaginatedService(page, limit);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
