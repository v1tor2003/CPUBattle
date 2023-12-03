import express from 'express'
const userRouter = express.Router()

import userController from '../controllers/userController.js'

userRouter.get('/users', userController.index)
userRouter.get('/users', userController.index)
userRouter.get('/users-create', userController.createUser)
userRouter.get('/users-update', userController.updateUser)
userRouter.get('/users-delete/:id', userController.deleteUser)

export default userRouter