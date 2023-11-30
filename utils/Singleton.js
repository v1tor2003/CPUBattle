class Singleton{
  static instances = {}
  constructor(){
    const className = this.constructor.name

    if(!Singleton.instances[className])
      Singleton.instances[className] = this
    
    return Singleton.instances[className]
  }

  static getInstance(className){
    return Singleton.instances[className]
  }

  static print(){
    console.log('instances:', Singleton.instances)
  }
}

export default Singleton