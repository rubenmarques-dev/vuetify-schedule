import { getUser } from '@/api/AuthRepository'

const state = {
  userLogged: null,
}

const mutations = {
  updateUser (state, user) {
    state.userLogged = user
  },
}

const actions = {
  fetchUser ({ commit }) {
    return new Promise((resolve) => {
      getUser()
        .then(user => {
          commit('updateUser', user)
          resolve()
        })
        .catch(() => {
          resolve()
        })
    })
  },
  setUserToNull ({ commit }) {
    commit('updateUser', null)
  },
}

const getters = {
  getUserLogged: (state) => {
    return state.userLogged
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
