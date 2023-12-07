import express from 'express'
import BenchController from '../controllers/benchController.js'
const benchRouter = express.Router()

benchRouter.get('/dashboard', BenchController.index)
benchRouter.post('/update-benchmark', BenchController.update)
benchRouter.post('/create-benchmark', BenchController.create)
benchRouter.post('/delete-benchmark', BenchController.delete)

export default benchRouter