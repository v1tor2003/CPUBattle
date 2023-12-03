import Model from './model.js';

class User extends Model{
  constructor(){ super('users', ['username', 'email', 'password']) }

  findUser(email){
    super.customQuery(`SELECT * FROM ${super.tableName} WHERE email = ${email}`,
    [], (rows) => {
      return rows[0] // should proabably return the id or null | undef
    })
  }

  delete(data){
    // logic to delete User children if so there constraints for that
    super.delete(data)
  }
}

export default new User()
