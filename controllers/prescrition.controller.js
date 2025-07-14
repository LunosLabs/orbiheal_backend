import { scanPrescriptionService } from "../orbiheal-services/prescription.service.js";

export const aiPrescriptionScanController = async (req, res, next) => {
  try {
    const result = await scanPrescriptionService(req.file);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};
