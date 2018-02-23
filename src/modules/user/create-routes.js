export default () => {
  const list = []
  list.push({
    path: '/',
    name: 'root',
    redirect: { name: 'overview' }
  })
  list.push({
    path: '/login',
    name: 'login',
    meta: {
      icon: 'lock',
      auth: false
    },
    component: () => System.import('./views/login')
  })
  list.push({
    path: '*',
    meta: {
      icon: 'lock',
      auth: false
    },
    redirect: { name: 'root' }
  })
  return list
}
