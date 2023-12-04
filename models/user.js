import Model from './model.js';

class User extends Model{
  constructor(){ super('users', ['username', 'email', 'password']) }

  async findByEmail(email){
    const sql = `SELECT * FROM ${this.tableName} WHERE email = ?`
    const params = [email]

    return await super.performQuery(sql, params)
  }

  delete(data){
    // logic to delete User children if so there constraints for that
    super.delete(data)
  }
}

export default new User()
