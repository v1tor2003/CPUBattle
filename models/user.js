import db from './db.js'

export default class User {
  static table = 'users'

  constructor(name){
    this.name = name
  }

  static getAll(callback){
    const sql = `SELECT * FROM ${User.table};`
    db.query(sql, (results) => {
      callback(results)
    }) 
  }
}