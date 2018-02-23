import { sCheckTokens } from 'apis/uc'
import message from 'components/message'

export default function (router, store) {
  // router hooks
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
      const { auth } = to.query
      if (auth) {
        sCheckTokens(auth).then(res => {
          store.dispatch('user/setTokens', res)
          next()
        }).catch(err => {
          message.info('校验失败', err.message)
          next(false)
        })
      } else {
        var _TOKENS = store.getters['user/tokens']
        if (_TOKENS && _TOKENS.access_token) {
          next()
        } else {
          next({
            path: '/login',
            query: { redirect: encodeURIComponent(to.path) }
          })
        }
      }
    } else {
      next()
    }
  })

  router.afterEach(() => {
    if (document.activeElement && document.activeElement.nodeName !== 'BODY') {
      document.activeElement.blur()
    }
  })
}
