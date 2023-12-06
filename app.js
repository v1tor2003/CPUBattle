import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import session from 'express-session'

import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import benchRouter from './routes/benchRoutes.js'

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
const ROOT_DIR = path.resolve(dirname(fileURLToPath(import.meta.url)))
const app = express()

// session for auth
app.use(session({
  secret: process.env.SECRET_KEY, 
  resave: false, saveUninitialized: true
}))

// body parser 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// custom routes
app.use(authRouter)

// layout extension to improve views rendering
app.use(expressLayouts)
app.use(benchRouter)
app.use(userRouter)

// assets
app.use(express.static('public'))
app.use('/js', express.static(path.join(ROOT_DIR, 'public/js')))
app.use('/img', express.static(path.join(ROOT_DIR, 'public/img')))
app.use('/css', express.static(path.join(ROOT_DIR, 'node_modules', 'bootstrap', 'dist','css')))
//app.use('/js', express.static(path.join(ROOT_DIR, 'node_modules', 'bootstrap', 'dist', 'js')))

// setting rendering engine to ejs
app.set('views', './views')
app.set('view engine', 'ejs')

// default root route
app.get('/', (req, res) => {
  res.render('pages/index', { user: req.session.user})
})

// live server setup
app.listen(PORT, () => console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode.`)) 