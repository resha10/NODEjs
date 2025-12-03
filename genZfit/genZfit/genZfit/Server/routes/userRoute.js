import express from "express";
import { isAuth, login, logout, register, getAllUsers, toggleUser } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import authSeller from "../middlewares/authSeller.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/is-auth", authUser, isAuth);
userRouter.get("/logout", authUser, logout);
userRouter.get("/users", authSeller, getAllUsers);

// New endpoint for toggling user status (seller only)
userRouter.post("/toggle-user", authSeller, toggleUser);

export default userRouter;
