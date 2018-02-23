import { TOKENS } from 'utils/constants'
import { SessionStorage } from 'utils/config'
import { sDelTokens } from 'apis/uc'

export default () => {
  const SET_TOKENS = 'SET_TOKENS'
  const DEL_TOKENS = 'DEL_TOKENS'

  const state = {
    tokens: SessionStorage.get(TOKENS) || {}
  }

  const getters = {
    tokens: state => {
      return state.tokens
    }
  }

  const actions = {
    setTokens ({ commit }, value) {
      commit(SET_TOKENS, value)
    },
    delTokens ({ commit }) {
      return sDelTokens().then(res => {
        commit(DEL_TOKENS)
      })
    }
  }

  const mutations = {
    [SET_TOKENS] (state, value) {
      state.tokens = value
      SessionStorage.set(TOKENS, value)
    },
    [DEL_TOKENS] (state, value) {
      state.tokens = {}
      SessionStorage.remove(TOKENS)
    }
  }
  return {
    state,
    getters,
    actions,
    mutations
  }
}
