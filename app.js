import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import 'dotenv/config'
const app = express()
//const router = express.Router()

import userController from './controllers/userController.js'

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'))
app.use('/js', express.static(path.join(new URL('.', import.meta.url).pathname, 'public/js')));
app.use('/css', express.static(path.join(new URL('.', import.meta.url).pathname, 'public/css')));

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index', {text: 'test message'})
})

app.get('/users', userController.index)

app.listen(PORT, () => console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode.`)) 