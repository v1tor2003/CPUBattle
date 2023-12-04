import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import bodyParser from 'body-parser'
import session from 'express-session'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

import userRouter from './routes/userRoutes.js'

const app = express()
const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
const ROOT_DIR = path.resolve(dirname(fileURLToPath(import.meta.url)))
// custom routes
app.use(userRouter)

// layout extension to improve views rendering
app.use(expressLayouts)

// body parser and session for auth
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true}))

// assets
app.use(express.static('public'))
app.use('/js', express.static(path.join(ROOT_DIR, 'public/js')))
app.use('/css', express.static(path.join(ROOT_DIR, 'node_modules', 'bootstrap', 'dist','css')))


// setting rendering engine to ejs
app.set('views', './views')
app.set('view engine', 'ejs')

// default root route
app.get('/', (req, res) => {
  res.render('pages/index', {text: 'test message'})
})

app.get('/auth-form-login', (req, res) => {
  res.render('pages/userForm')
})

app.get('/auth-form-register', (req, res) => {
  res.render('pages/userForm')
})

// live server setup
app.listen(PORT, () => console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode.`)) 