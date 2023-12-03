import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import path from 'path'
import 'dotenv/config'

import userRouter from './routes/userRoutes.js'

const app = express()

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

// custom routes
app.use(userRouter)

// body parser and session for auth
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true}))

// assets
app.use(express.static('public'))
app.use('/js', express.static(path.join(new URL('.', import.meta.url).pathname, 'public/js')));
app.use('/css', express.static(path.join(new URL('.', import.meta.url).pathname, 'public/css')));

// setting rendering engine to ejs
app.set('views', './views')
app.set('view engine', 'ejs')

// default root route
app.get('/', (req, res) => {
  res.render('index', {text: 'test message'})
})

// live server setup
app.listen(PORT, () => console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode.`)) 