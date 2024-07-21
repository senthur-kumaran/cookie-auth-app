import express from "express";
import userController from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/", userController.getAllUsers);

export default userRoutes;
