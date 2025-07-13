import { getUserByIdService } from "../services/user.service.js";

export const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string" || !id.trim()) {
      return res.status(400).json({ error: "Invalid user ID." });
    }

    const user = await getUserByIdService(id.trim());

    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
