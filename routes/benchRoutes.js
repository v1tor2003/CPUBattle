import express from 'express'
import isAuthenticated from '../middleware/authMiddleware.js'
import BenchController from '../controllers/benchController.js'
const benchRouter = express.Router()

benchRouter.get('/dashboard', BenchController.index)
benchRouter.post('/update-benchmark/:id', BenchController.update)
benchRouter.post('/create-benchmark', BenchController.create)
benchRouter.post('/delete-benchmark/:id', BenchController.delete)

export default benchRouter