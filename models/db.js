import 'dotenv/config'
import mysql from 'mysql'
import Singleton from '../utils/Singleton.js';

class DataBase extends Singleton{
  constructor(params){
    super('DataBase')
    
    if (!this.connection) {
      this.connection = mysql.createConnection(params);

      this.connection.connect((err) => {
        if (err) {
          console.error('error connecting: ' + err.stack)
          return
        }

        console.log('connected to MySQL as id ' + this.connection.threadId)
      })
    }
  }

  query(sql, callback){
    this.connection.query(sql, (error, results, fields) => {
      if(error) throw error
      console.log(results)

      callback(results)
    })
  }
}

const dbCredentials = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

const db = new DataBase(dbCredentials)

export default db
