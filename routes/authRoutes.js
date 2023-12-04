import express from "express";
import isAuthenticated from "../middleware/authMiddleware.js";
import authController from "../controllers/authController.js";
const authRouter = express.Router()

authRouter.get('/auth-login', isAuthenticated, authController.getDash)
authRouter.get('/auth-login', authController.getAuthFormLogin)
authRouter.get('/auth-register', authController.getAuthFormRegister)
authRouter.post('/register', authController.register)
authRouter.post('/login', express.urlencoded({extended: false}), authController.login)
authRouter.get('/logout', authController.logout) 

export default authRouter
