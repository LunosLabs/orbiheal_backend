import { addNewGenericService } from "../services/generic.service.js";

export const addNewGenericController = async (req, res, next) => {
  try {
    const result = await addNewGenericService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
