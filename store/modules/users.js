export const namespaced = true

export const state = {
  users: [],
  user: null,
  token: null
}

export const mutations = {
  RESET_USER(state) {
    state.user = null
  },
  SET_USER(state, user) {
    state.user = user
  },
  SET_USERS(state, users) {
    state.users = users
    localStorage.setItem('users', JSON.stringify(users))

  },
  SET_TOKEN(state, token) {
    state.token = token
    localStorage.setItem('token', token)
    setTimeout(() => {
      window.location.reload()
    }, 1000)

  },

}

export const actions = {
  // resetuser({ commit }) {
  //   commit('RESET_USER')
  // }, 
  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
  },

  logout({ commit }) {
    commit('SET_TOKEN', null)
    localStorage.removeItem('token')
    this.$router.push('/')
  }


}

export const getters = {
  users(state) {
    return state.users
  },
  user(state) {
    return state.user
  },

  token(state) {
    return state.token || localStorage.getItem('token')
  }

}
