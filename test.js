import User from './models/user.js'
const email = 'joao@bar'
const res = await User.findByEmail(email)
if(res[0])
  console.log(res[0].username)
