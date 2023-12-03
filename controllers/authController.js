import User from "../models/user.js";

const user = new User()

export default class authController{
  static register(req, res){
    const userData = req.body
    user.create(userData, (results) => {
      res.redirect('/login')
    })
  }

  static login(req, res){
    const {email, password } = req.body

    const foundUser = user.findUser(email)
    if(foundUser && foundUser.password === password){
      req.session.userId = foundUser.id
      res.redirect('/dash')
    }else{
      res.redirect('/login')
    }
  }

  static test(req, res){
    console.log(req.body)
  }
}