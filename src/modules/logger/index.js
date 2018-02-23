import createLogger from 'vuex/dist/logger'

export default ({ store }) => {
  createLogger()(store)
}
