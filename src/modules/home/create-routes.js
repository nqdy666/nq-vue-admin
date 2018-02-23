import overview from './routes/overview'
import demo from './routes/demo'
import table from './routes/table'
import form from './routes/form'
import search from './routes/search'

export default () => {
  return [
    {
      path: '',
      name: 'home',
      meta: {
        auth: true
      },
      component: () => System.import('./views/index.vue'),
      children: [
        ...overview,
        ...demo,
        ...table,
        ...form,
        ...search
      ]
    }
  ]
}
