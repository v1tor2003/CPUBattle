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
    let id = ''

    switch (this.tableName) {
      case 'processors':
        id = 'processor_id'
        this.fillableColumns.pop('bench_fk')
        this.fillableColumns.pop('manu_fk')
        break;
      case 'benchmarks':
        id = 'bench_id'
        this.fillableColumns.pop(['user_fk'])
        break;
      case 'users':
          id = 'user_id'
      default:
        break;
    }

    const setStatemments = this.fillableColumns.map(colmun => `${colmun} = ?`).join(', ')
    const params = this.fillableColumns.map(colmun => data[colmun])
    params.push(data.id)

    const sql = `UPDATE ${this.tableName} SET ${setStatemments} WHERE ${id} = ?`
    
    return await this.performQuery(sql, params)
  }

  async delete(data){
    let idColumn = ''
    if(this.tableName === 'processors')
      idColumn = 'bench_fk'
    else idColumn = 'bench_id'
    const sql = `DELETE FROM ${this.tableName} WHERE ${idColumn} = ?`
    const params = [data.id] 
    
    return await this.performQuery(sql, params)
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

