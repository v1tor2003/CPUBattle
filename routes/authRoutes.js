import express from "express";
import AuthController from "../controllers/authController.js";
const authRouter = express.Router()

authRouter.get('/auth-login', AuthController.getAuthFormLogin)
authRouter.get('/auth-register', AuthController.getAuthFormRegister)
authRouter.post('/register', AuthController.register)
authRouter.post('/login', AuthController.login)
authRouter.get('/logout', AuthController.logout) 


export default authRouter
