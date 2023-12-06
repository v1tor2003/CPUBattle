import Benchmark from "../models/benchmark.js"
import Processor from "../models/processor.js"
import User from "../models/user.js"
class BenchController{
  constructor(){}
  async index(req, res){
    const data = await Benchmark.all()
    const user = await User.findByEmail(req.session.user)
    
    res.render('pages/dashboard', { user: user[0], data })
  }

  async create(req, res){
    console.log('creating',req.body)
    console.log('user',req.session.user)
    
    try{
      const email = req.session.user
      const user = await User.findByEmail(email)
      if(!user[0].user_id) return

      const benchData = {
        bench_single_pontuation: req.body.single_score,
        bench_mult_pontuation: req.body.mult_score,
        bench_done_at: req.body.bench_date,
        user_fk: user[0].user_id,
      }

      const benchId = await Benchmark.insertAndGetId(benchData)
      if(benchId === -1) return
      
      const manuId = (req.body.manufacturer == 'Intel') ? 1 : 2

      const cpuData = {
        processor_model: req.body.model,
        processor_socket: req.body.socket,
        processor_cores: req.body.cores,
        processor_threads: req.body.threads,
        processor_speed: req.body.speed,
        bench_fk: benchId,
        manu_fk: manuId
      }
      
      const result = await Processor.create(cpuData)
      
      if(result.affectedRows > 0) {
        const data = await Benchmark.all()
        res.render('pages/dashboard', {data, user: user[0], success: 'Benchmark created!'})
      }
      else res.render('pages/dashboard',{error:'Error creating a benchmark.'})
    }catch(err){
      console.error(err)
      res.render('pages/dashboard', {error: 'An internal server error occurred deleting user'})
    }
  }

  async update(req, res){
    console.log('update',req.body)
    console.log(req.params.id)
    try {
      const user = User.findByEmail(req.session.email)

      const benchData = {
        bench_id: req.body.id,
        bench_single_pontuation: req.body.single_score,
        bench_mult_pontuation: req.body.mult_score,
        bench_done_at: req.body.bench_date,
      }     

      const cpuData = {
        processor_model: req.body.model,
        processor_socket: req.body.socket,
        processor_cores: req.body.cores,
        processor_threads: req.body.threads,
        processor_speed: req.body.speed,
      }

      await Processor.update(cpuData)
      const result= await Benchmark.update(benchData)
      if(result.affectedRows > 0) {
        const data = await Benchmark.all()
        res.render('pages/dashboard', {data, user: user[0], success: 'Benchmark updated'})
      }else{
        res.render('pages/dashboard',{error:'Error updating a benchmark.'})
      }

    } catch (err) {
      console.error(err)
      res.render('pages/dashboard', {error: 'An internal server error ocurred updating user'})
    }
  }

  async delete (req, res){
    console.log('deleting', req.params.id)
    
    try {
      const user = await User.findByEmail(req.session.user)
      const data = {
        id: req.params.id
      }
   
      const result =  await Benchmark.delete(data)
      
      if(result.affectedRows > 0) {
        const data = await Benchmark.all()
        res.render('pages/dashboard', {data, user: user[0], success: 'Benchmark deleted!'})
      }else{
        res.render('pages/dashboard',{error:'Error creating a benchmark.'})
      }
    } catch (error) {
      console.error(error)
      res.render('pages/dashboard', {error: 'An internal server error occurred'})
    }
  }
}

export default new BenchController()