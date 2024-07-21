import userService from "../services/userService.js";
import asyncHandler from "../middleware/asyncHandler.js";

const getAllUsers = asyncHandler(async (_req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

export default { getAllUsers };
