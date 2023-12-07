import Benchmark from "../models/benchmark.js"
import Processor from "../models/processor.js"
import Manufacturer from "../models/manufacturer.js"
import User from "../models/user.js"

class BenchController{
  constructor(){}
  async index(req, res){
    const data = await Benchmark.all()
    const user = await User.findByEmail(req.session.user)
    if(user[0])
      console.log('User in session:', user[0].user_name)
    res.render('pages/dashboard', { user: user[0], data })
  }

  async create(req, res){
    console.log('Creating: ',req.body)
    console.log('User: ',req.session.user)
    
    try{
      const email = req.session.user
      const user = await User.findByEmail(email)
      if(!user[0].user_id) throw (new Error('Error inserting benchmark, user does not exists'))

      const benchData = {
        bench_single_pontuation: req.body.single_score,
        bench_mult_pontuation: req.body.mult_score,
        bench_done_at: req.body.bench_date,
        user_fk: user[0].user_id,
      }

      const benchId = await Benchmark.insertAndGetId(benchData)
      if(benchId === -1) throw (new Error('Error inserting benchmark, cannot insert into benchmarks'))
      
      const manu = await Manufacturer.findByName(req.body.manufacturer)

      if(!manu[0].manu_id) throw (new Error('Error inserting benchmark, manufacturer does not exists'))
      
      const cpuData = {
        processor_model: req.body.model,
        processor_socket: req.body.socket,
        processor_cores: req.body.cores,
        processor_threads: req.body.threads,
        processor_speed: parseFloat(req.body.speed) * 1000,
        bench_fk: benchId,
        manu_fk: manu[0].manu_id
      }
      
      const result = await Processor.create(cpuData)
      
      if(result.affectedRows > 0) {
        const data = await Benchmark.all()
        res.render('pages/dashboard', {data, user: user[0], success: 'Benchmark created!'})
      }
      else res.render('pages/dashboard',{data, user: user[0],error:'Error creating a benchmark.'})
    }catch(err){
      console.error(err)
      res.render('pages/dashboard', {error: 'An internal server error occurred creating benchmark'})
    }
  }

  async update(req, res){
    console.log('Updating: ',req.body)
    console.log('Bench_id: ', req.body.bench_id)
    console.log('Processor_id: ', req.body.processor_id)

    try {
      const email = req.session.user
      const user = await User.findByEmail(email)
      if(!user[0].user_id) throw (new Error('Error updating benchmark, user does not exists'))

      const benchData = {
        id: req.body.bench_id,
        bench_single_pontuation: req.body.single_score,
        bench_mult_pontuation: req.body.mult_score,
        bench_done_at: req.body.bench_date,
      }     

      const cpuData = {
        id: req.body.processor_id,
        processor_model: req.body.model,
        processor_socket: req.body.socket,
        processor_cores: req.body.cores,
        processor_threads: req.body.threads,
        processor_speed: parseFloat(req.body.speed) * 1000,
      }

      await Processor.update(cpuData)
      const result= await Benchmark.update(benchData)
      if(result.affectedRows > 0) {
        const data = await Benchmark.all()
        res.render('pages/dashboard', {data, user: user[0], success: 'Benchmark updated'})
      }else{
        res.render('pages/dashboard',{data, user: user[0], error:'Error updating a benchmark.'})
      }

    } catch (err) {
      console.error(err)
      res.render('pages/dashboard', {error: 'An internal server error ocurred updating user'})
    }
  }

  async delete (req, res){
    console.log('Deleting benchmark: ', req.body.id)
    
    try {
      const user = await User.findByEmail(req.session.user)
      const data = {
        id: req.body.id
      }
   
      const result =  await Benchmark.delete(data)
      
      if(result.affectedRows > 0) {
        const data = await Benchmark.all()
        res.render('pages/dashboard', {data, user: user[0], success: 'Benchmark deleted!'})
      }else{
        res.render('pages/dashboard',{data, user: user[0], error:'Error deleting a benchmark.'})
      }
    } catch (error) {
      console.error(error)
      res.render('pages/dashboard', {error: 'An internal server error occurred'})
    }
  }
}

export default new BenchController()