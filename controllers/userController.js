import User from "../models/user.js";

class userController{
  constructor(){}

  async index(req, res){
    try{
      const users = await User.all()
      res.render('users', {users})
    }catch(err) { console.error(err) }
  }
  // probably going to register/authController
  async createUser(req, res){
    const data = {
      username: 'pig',
      email: 'pig@test',
      password: 'lol'
    }

    try{
      await User.create(data)
      res.end()
    }catch(err) { console.log(err) }
  }

  async updateUser(req, res){
    const data = {
      id: 5,
      username: 'dennis',
      email: 'dennis@updated',
      password: 'uptd'
    }

    try{
      await User.update(data)
      res.end()

    }catch(err) { console.log(err) }
  }

  async deleteUser(req, res){
    const data = {
      id: req.params.id
    }

    try{
      await User.delete(data)
      res.end()
    }catch(err) {console.error(err) }
  }


  static login(req, res){
    try{
      console.log('Inside /create-user route')
      
      const data = {
        username: 'maria',
        email: 'maria@email.com',
        password: '1234'
      }

      const user = new User()
      const id = user.findUser(data.email)
      console.log(id)
    }catch(error){
      console.error(error)
      res.status(500).send('Internal Server Error')
    }
  }

  static register(req, res){
    try{
      console.log('Inside /register route')
      const user = new User()
      const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }
      
      const id = user.findUser(data.email)
      if(id) res.send('user already exits')
      else user.create(data, (results) => {
        res.send(results)
      })
    }catch(error){
      console.error(error)
      res.status(500).send('Internal Server Error')
    }
  }
}

export default new userController()