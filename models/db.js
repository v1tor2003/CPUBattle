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

  async query(sql, params){
    try{
      const [rows, fields] = await this.connection.execute(sql, params)
      return rows;
    }catch(error){
      console.error('Error perfoming query:', error)
      throw error
    }
  }
}

const dbCredentials = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
}

const db = new DataBase(dbCredentials)

export default db
