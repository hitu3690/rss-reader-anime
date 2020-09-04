export const state = () => ({
  authUser: null
})

export const getters = {
  authUser: state => state.authUser,
};

export const mutations = {
  setAuthUser(state, authUser) {
    state.authUser = authUser
  }
}

export const actions = {
  async login({ commit }, userInfo) {
    console.log("login")
    const res = await this.$axios.post('/api/v1/sessions', { session: userInfo }).catch(err => {
      console.log("error")
      commit("setAuthUser", null);
      return null
    })
    console.log("success")
    console.log(res.data)
    commit('setAuthUser', res.data)
    return res.data
  },
  async logout({ commit }) {
    const res = await this.$axios.delete('/sessions')
    commit('setAuthUser', null)
  },
  async signup({ commit }, userInfo) {
    const res = await this.$axios.post('/users', { user: userInfo }).catch(err => {
      commit("setAuthUser", null);
      return null
    })
    commit('setAuthUser', res.data.user)
    return res.data
  }
}
