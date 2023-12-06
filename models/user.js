import Benchmark from './benchmark.js';
import Model from './model.js';

class User extends Model{
  constructor(){ super('users', ['user_name', 'user_email', 'user_password']) }

  async findByEmail(email){
    const sql = `SELECT * FROM ${this.tableName} WHERE user_email = ?`
    const params = [email]

    return await super.performQuery(sql, params)
  }

  async delete(data){
    await Benchmark.delete(data)
    return await super.delete(data)
  }
}

export default new User()
