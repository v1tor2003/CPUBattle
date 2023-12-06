import Model from "./model.js"

class Manufacturer extends Model{
  constructor(){super('manufacturers', [])}

  async findByName(name){
    const sql = `SELECT * FROM ${this.tableName} WHERE manu_name = ?`
    const params = [name]

    return await super.performQuery(sql, params)
  }
}

export default new Manufacturer()