import db from './db.js';

export default class Model {
  constructor(tableName, fillableColumns) {
    this.tableName = tableName;
    this.fillableColumns = fillableColumns // should make then protected
  }

  async all() {
    const sql = `SELECT * FROM ${this.tableName};`
    const params = []

    return await this.performQuery(sql, params)
  }

  async create(data){
    const colmuns = this.fillableColumns.join(', ')
    const placeHolders = this.fillableColumns.map(() => '?').join(', ')

    const params = this.fillableColumns.map(colmun => data[colmun])
    const sql = `INSERT INTO ${this.tableName} (${colmuns}) VALUES (${placeHolders})`

    return await this.performQuery(sql, params)
  }

  async update(data){
    const tablePrimaryKey = await this.getPrimaryKey()
    const setStatemmentsArray = this.fillableColumns.map(colmun => data[colmun] ? `${colmun} = ?` : '')
    const colmuns = setStatemmentsArray.filter(colmun => colmun !== '').join(', ')
    const params = this.fillableColumns.map(colmun => data[colmun]).filter(colmun => colmun !== undefined)
    params.push(data.id)

    const sql = `UPDATE ${this.tableName} SET ${colmuns} WHERE ${tablePrimaryKey} = ?`
    return await this.performQuery(sql, params)
  }

  async getPrimaryKey(){
    const sql = ` SELECT COLUMN_NAME 
                  FROM INFORMATION_SCHEMA.COLUMNS
                  WHERE TABLE_NAME = '${this.tableName}' 
                  AND COLUMN_KEY = 'PRI' 
                  AND DATA_TYPE = 'int'`;
    const params = []
    const res = await this.performQuery(sql, params)
    
    return (res[0].COLUMN_NAME)
  }

  async delete(data){
    try{
      const tablePrimaryKey = await this.getPrimaryKey()
      const sql = `DELETE FROM ${this.tableName} WHERE ${tablePrimaryKey} = ?`
      const params = [data.id] 
  
      return await this.performQuery(sql, params)  
    }catch(err){
      console.error(err)
      throw err
    }
  }

  async insertAndGetId(data){
    try{
      const res = await this.create(data)
      if(res.affectedRows > 0) return res.insertId
      else return -1
    }catch(err){
      console.error(err)
      throw err
    }
    
  }
  async performQuery(sql, params){
    try{
      const res = await db.execute(sql, params)
      return res
    }catch(err) {
      console.error(err)
      throw err
    }
  }
}

