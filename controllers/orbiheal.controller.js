import { orbiAddNewMedicineService } from '../orbiheal-services/autofill.service.js';

export const orbiAddMedicineController = async (req, res, next) => {
  try {
    const result = await orbiAddNewMedicineService(req.params.entity, req.body);
    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
