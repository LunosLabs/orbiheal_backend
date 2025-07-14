import {
  addNewFormService, deleteFormService,
  getFormsByIdService,
  getFormsPaginatedService,
  updateFormService
} from "../services/form.service.js";


export const addNewFormController = async (req, res, next) => {
  try {
    const result = await addNewFormService(req.body);
    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateFormController = async (req, res, next) => {
  try {
    const result = await updateFormService(req.params.id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteFormController = async (req, res, next) => {
  try {
    const result = await deleteFormService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getFormByIdController = async (req, res, next) => {
  try {
    const result = await getFormsByIdService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getFormsPaginatedController = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const result = await getFormsPaginatedService(page, limit)
    return res.status(200).json(result);
  } catch(error){
    next(error);
  }
}


