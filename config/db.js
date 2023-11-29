import mysql from 'mysql'

class DataBase{
  constructor(host, user, pw, db_name){
    if(!DataBase.instance){
      this.connection = mysql.createConnection({
        host: host,
        user: user,
        password: pw,
        database: db_name
      })

      DataBase.instance = this
    }

    return DataBase.instance
  }

  connect(){
    this.connection.connect((err) => {
      if(err){
        console.error('Error connecting to MySQL: ' + err.stack)
        return
      }
      console.log('Connected to MySQL as id ' + this.connection.threadId)
    })
  }

  disconnect(){
    this.connection.end()
  }
}

const instance = new DataBase()
Object.freeze(instance)
module.exports = instance