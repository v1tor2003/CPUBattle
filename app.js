import express from 'express'
import path from 'path'
import db from './config/db'
import 'dotenv/config'
const app = express()

const PORT = process.env.PORT
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const NODE_ENV = process.env.NODE_ENV

db.connect(DB_HOST, DB_USER, DB_PASS, DB_NAME)

app.use(express.static('public'))
app.use('/js', express.static(path.join(new URL('.', import.meta.url).pathname, 'public/js')));


app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index', { text: 'this is a test message'})
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode.`)) 