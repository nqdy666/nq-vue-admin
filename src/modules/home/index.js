import createRoutes from './create-routes'

export default (context, options = {}) => {
  options = { scope: 'home', prefix: '/h', ...options }
  return ({
    routes: createRoutes(context, options),
    options
  })
}
