import User from "../models/user.js";

class authController{
  getAuthFormLogin(req, res){
    res.send('pages/userForm')
  }

  getAuthFormRegister(req, res){
    res.send('pages/userForm')
  }

  getDash(req, res) {
    res.render('pages/dash', {user: req.session.user})
  }

  login(req, res){

      // do logic to validate user


    req.session.regenerate((err) => {
      if(err) next(err)
      req.session.user = req.body.user
      req.session.save((err) => {
        if(err) return err
        res.redirect('/dash')
      })
    })
  }

  register(req, res){
    // create user
    return this.login(req, res)
  }

  logout(req, res, next){
    req.session.user = null
    req.session.save((err) => {
      if(err) next(err)
      req.session.regenerate((err) => {
        if(err) next(err)
        res.redirect('/')
      })
    })
  }
}

export default new authController()