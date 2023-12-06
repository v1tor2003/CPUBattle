import User from "../models/user.js";

class AuthController{
  getAuthFormLogin(req, res){
    res.render('pages/loginForm')
  }

  getAuthFormRegister(req, res){
    res.render('pages/registerForm')
  }

  async login(req, res){
    console.log(req.body)
    try {
      const userEmail = req.body.email
      const user = await User.findByEmail(userEmail)
      if(user[0] && user[0].user_password == req.body.password){
        req.session.regenerate((err) => {
          if(err) next(err)
          req.session.user = userEmail

          if (req.body.rememberMe) 
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
          

          req.session.save((err) => {
            if(err) return err
            res.redirect('/dashboard')
          })
        })  
      }else{
        res.render('pages/loginForm', {error: 'Invalid username or password, try again.'})
      }
    } catch (err) { 
      console.error(err) 
      res.render('pages/loginForm', { error: 'An unexpected error occurred during user login'})
    }
  }

  async register(req, res){
    console.log(req.body)

    try{
      const data = {
        user_name: req.body.username,
        user_email: req.body.email,
        user_password: req.body.password
      }
      let query = await User.findByEmail(data.email)

      if(query.length > 0){
        res.render('pages/registerForm', {error: 'Error creating user, each user must have an unique email.'})
        return
      }

      query = await User.create(data)
      
      if(query.affectedRows > 0)  res.redirect(307, '/login')
      else res.render('pages/registerForm', { error: 'An unexpected error occurred during user registration.' })
    }catch(err) {
      console.error(err)
      res.render('pages/registerForm', { error: 'An unexpected error occurred during user registration.' })
    }
  }

  logout(req, res, next){
    req.session.save((err) => {
      if(err) next(err)
      req.session.user = null
      req.session.regenerate((err) => {
        if(err) next(err)
        res.redirect('/')
      })
    })
  }
}

export default new AuthController()