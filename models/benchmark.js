
import Model from './model.js'
import Processor from './processor.js'

class Benchmark extends Model{
  constructor(){ super('benchmarks', ['bench_single_pontuation', 
                                      'bench_mult_pontuation', 
                                      'bench_done_at', 
                                      'user_fk']) }

  
  async all(){
    const sql = `SELECT 
    COUNT(*) AS row_count,
    b.bench_id,
    b.bench_mult_pontuation AS mult_score,
    b.bench_single_pontuation AS single_score,
    b.bench_done_at AS benched_at,
    p.processor_model,
    m.manu_name AS manufacturer_name,
    u.user_name
FROM benchmarks b
INNER JOIN processors p ON b.bench_id = p.bench_fk
INNER JOIN users u ON b.user_fk = u.user_id
INNER JOIN manufacturers m ON p.manu_fk = m.manu_id
GROUP BY b.bench_id, b.bench_mult_pontuation, b.bench_single_pontuation, b.bench_done_at, p.processor_model, m.manu_name, u.user_name;

    `

    const params = []
    const query = await super.performQuery(sql, params)
    console.log(query)
    //return await super.performQuery(sql, params)
  }
 

  async delete(data){
    await Processor.delete(data)
    return await super.delete(data)
  }
}


export default new Benchmark()