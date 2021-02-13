
const state = {
  snack: {},

}

const mutations = {
  setSnack (state, showSnack) {
    state.snack = { ...showSnack }
  },
  resetState (state) {
    Object.assign(state, {})
  },
}

const actions = {

}

const getters = {
  getSnack: (state) => {
    return state.snack
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
