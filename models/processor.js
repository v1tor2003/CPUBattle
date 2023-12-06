import Model from './model.js'

class Processor extends Model{
  constructor(){ super('processors', ['processor_model',
                                      'processor_socket',
                                      'processor_cores',
                                      'processor_threads',
                                      'processor_speed',
                                     'bench_fk',
                                     'manu_fk'])}
 
}

export default new Processor()