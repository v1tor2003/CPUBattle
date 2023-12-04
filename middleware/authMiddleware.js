export default function isAuthenticated (req, res, next) {
  if(req.session.user) next()
  else next('/login')
}