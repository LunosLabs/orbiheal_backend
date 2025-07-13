import { addNewFormService } from "../services/form.service.js";

export const addNewFormController = async (req, res, next) => {
  try {
    const result = await addNewFormService(req.body);
    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
