import express from 'express'
import isAuthenticated from '../middleware/authMiddleware.js'
import BenchController from '../controllers/benchController.js'
const benchRouter = express.Router()

benchRouter.get('/dash', BenchController.index)
benchRouter.post('/edit-bench/:id', isAuthenticated)
benchRouter.post('/create-bench', isAuthenticated)
benchRouter.delete('/delete-bench/:id', isAuthenticated)

export default benchRouter