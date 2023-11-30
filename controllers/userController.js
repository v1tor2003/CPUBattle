import User from "../models/user.js";

export default class userController{
  constructor(){}
  static index(req, res){
    User.getAll((users) => {
      res.render('users', { users })
    })
  }
}