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
    const setStatemments = this.fillableColumns.map(colmun => `${colmun} = ?`).join(', ')
    const params = this.fillableColumns.map(colmun => data[colmun])
    params.push(data.id)

    const sql = `UPDATE ${this.tableName} SET ${setStatemments} WHERE id = ?`
    
    return await this.performQuery(sql, params)
  }

  async delete(data){
    const params = [data.id] 
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`
    
    return await this.performQuery(sql, params)
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

