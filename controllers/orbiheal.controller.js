import { fetchNewMedicineService } from "../orbiheal-ai/fetch_medicine.service.js";

export const aiFetchMedicineController = async (req, res, next) => {
  try {
    const result = await fetchNewMedicineService(req.body);
    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
