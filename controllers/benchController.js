class BenchController{
  constructor(){}
  async index(req, res){
    res.render('pages/dash', { user: req.session.user, benchs: 'test' })
  }
}

export default new BenchController()