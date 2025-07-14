import {
  addNewGenericService,
  getGenericByIdService,
  getGenericsPaginatedService,
  deleteGenericService,
  updateGenericService,
} from "../services/generic.service.js";


export const addNewGenericController = async (req, res, next) => {
  try {
    const result = await addNewGenericService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateGenericController = async (req, res, next) => {
  try {
    const result = await updateGenericService(req.params.id, req.body);
    return res.status(201).json(result);
  } catch (error){
    next(error);
  }
}

export const deleteGenericController = async (req, res, next) => {
  try {
    const result = await deleteGenericService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


export const getGenericByIdController = async (req, res, next) => {
  try {
    const result = await getGenericByIdService(req.params.id);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getGenericPaginatedController = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const result = await getGenericsPaginatedService(page, limit);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};